#!/usr/bin/env node

/**
 * Render smoke-check (remediation R5.2a).
 *
 * WHY: `validate.mjs` is a static Node linter with no running server, so it cannot catch a
 * component-resolution failure that renders a 500 at request time. The capstone review found
 * exactly this — `caas-integration.mdx` passed every static check yet served a 500 live because
 * a component was placed inline in a `<Note>` (ai/LESSONS.md 2026-08-10 "render smoke-check gap").
 *
 * WHAT: the *workflow* serves the portal; this script HTTP-checks nav routes for a 2xx/3xx
 * response and exits non-zero on any route that does not render. Default is `--changed` scope
 * (only nav routes whose `.mdx` changed vs the base ref) for speed; pass no flag to sweep all.
 * A changed `snippets/**\/*.mdx` adds every page that imports it (importer map, shared with
 * `validate.mjs --changed`).
 *
 * `--browser` also loads each route in headless Chrome over CDP, because a broken snippet or
 * diagram fails client-side while the HTTP status stays 200 (a bad shared snippet blanks the
 * whole host page). Per route it waits (count-based, `--timeout`) for the expected diagram count
 * and fails on: a Mermaid error SVG ("Syntax error" / aria-roledescription="error"); diagram
 * containers without an SVG; a diagram count other than the static expected count (the page's
 * own mermaid fences + the fences of the snippets it renders); an HTTP status outside 2xx/3xx;
 * a console or browser error or uncaught exception. Label floor: every label is measured as laid
 * out at a 1280 px viewport, and a label below 9 px fails the route for a diagram from a
 * snippets/diagrams/ import (always) or a diagram whose fence text is new or changed since the
 * base ref. A diagram whose fence is unchanged at the base only warns, and the run ends with the
 * list of those older diagrams. `--floor-all` makes every diagram blocking. Manual local step:
 * needs a running preview, Chrome, and the Node 20 WebSocket flag. No npm dependency.
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node scripts/render-check.mjs            # full nav sweep
 *   BASE_URL=http://localhost:3000 node scripts/render-check.mjs --changed  # changed pages only
 *     --base <ref>   base git ref for --changed diff (default: $RENDER_CHECK_BASE or origin/main)
 *   node scripts/render-check.mjs <route>[=<expected>] ...                  # explicit routes
 *   CHROME_PATH=<chrome binary> BASE_URL=<preview origin> \
 *     node --experimental-websocket scripts/render-check.mjs --browser [--changed --base HEAD | <route> ...]
 *     --timeout <ms> per-route wait for the expected diagrams (default 60000)
 *     --base <ref>   also the label-floor base: a diagram whose fence text is unchanged at the
 *                    merge-base of <ref> and HEAD only warns (default HEAD, also with --changed;
 *                    $RENDER_CHECK_BASE sets only the --changed page set)
 *     --floor-all    every diagram below the label floor fails, unchanged ones too
 * Preview: npx -y mint@<MINT_VERSION> dev --port <free port> --no-open
 * Exit: 0 pass, 1 a route failed, 2 setup or usage problem (no Chrome / no WebSocket flag /
 *       bad --timeout / --base not a commit).
 */

import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync, realpathSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { join, dirname, posix } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

// Mintlify CLI version the local preview is pinned to (printed by --browser and the .md check).
export const MINT_VERSION = "4.2.1200";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// px — browser viewport the label floor is measured at, the width readers get on a laptop. Diagram
// containers are measured as mint lays them out there, not forced wider. Measured 2026-11-04 with
// mint 4.2.1200: every diagram container on the seven slice-1 host pages is 529 px wide.
const VIEWPORT_WIDTH = 1280;
const MIN_LABEL_PX = 9;
// Diagrams from these snippets are shared across pages: their label floor always blocks.
const SHARED_DIAGRAMS_DIR = "snippets/diagrams/";

// ─── Shared: changed set, snippet importer map, expected diagram counts ─────

// Top-level names Mintlify does not build (.mintignore), plus dependencies. Dot-dirs are
// skipped separately.
function mintIgnored(root) {
  let names = [];
  try {
    names = readFileSync(join(root, ".mintignore"), "utf8")
      .split("\n").map((l) => l.trim().replace(/^\/|\/$/g, "")).filter((l) => l && !l.startsWith("#"));
  } catch { /* no .mintignore */ }
  return new Set(["node_modules", ...names]);
}

// Every .mdx Mintlify builds (pages and snippets), repo-relative with forward slashes.
function listMdx(root) {
  const skip = mintIgnored(root);
  const out = [];
  (function walk(dir, prefix) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix + e.name;
      if (e.name.startsWith(".") || skip.has(rel)) continue;
      if (e.isDirectory()) walk(join(dir, e.name), rel + "/");
      else if (e.name.endsWith(".mdx")) out.push(rel);
    }
  })(root, "");
  return out;
}

// What an .mdx renders: its own mermaid diagrams and the .mdx snippets it pulls in. Comments
// and code fences are stripped first, so a commented-out or quoted import does not count.
// Supported import form (the only one the portal uses): a default import of an .mdx file by an
// absolute (/snippets/x.mdx) or relative (./x.mdx) path. Named imports, bare "snippets/x.mdx"
// paths and .jsx modules are not resolved, so they add no importers and no expected diagrams.
function scanMdx(content, rel) {
  // {/* */} comments render nothing. lineOf maps each line left after removing them to its line
  // in the file, so a diagram can be reported by its source line.
  let text = "", line = 1, last = 0;
  const lineOf = [1];
  const emit = (s) => {
    const parts = s.split("\n");
    text += parts.join("\n");
    for (let i = 1; i < parts.length; i++) lineOf.push(++line);
  };
  for (const c of content.matchAll(/\{\/\*[\s\S]*?\*\/\}/g)) {
    emit(content.slice(last, c.index));
    line += (c[0].match(/\n/g) || []).length;
    last = c.index + c[0].length;
  }
  emit(content.slice(last));

  const outside = []; // lines outside code fences: { text, start (offset in body), line }
  const ownFences = []; // mermaid fences in order: { line, at (outside lines before it), text }
  let fence = null; // the open mermaid fence, if the open fence is one
  let offset = 0;
  let open = null; // marker run (``` or ~~~) of the open fence
  text.split("\n").forEach((l, i) => {
    // mint renders ```mermaid, ````mermaid, ~~~mermaid and an indented fence (in <Tab>/<Step>) as
    // a diagram; the language is case-sensitive (```Mermaid stays a code block).
    const m = l.match(/^\s*(`{3,}|~{3,})(.*)/);
    if (m && open === null) {
      open = m[1];
      fence = m[2].trim().split(/\s+/)[0] === "mermaid" ? { line: lineOf[i], at: outside.length, lines: [] } : null;
      if (fence) ownFences.push(fence);
      return;
    }
    if (m && m[1][0] === open[0] && m[1].length >= open.length && !m[2].trim()) { open = null; return; }
    if (open === null) {
      outside.push({ text: l, start: offset, line: lineOf[i] });
      offset += l.length + 1;
    } else if (fence) {
      fence.lines.push(l);
    }
  });
  // Fence text as compared with the base: the fence's common leading indentation removed (and
  // trailing whitespace), so moving a fence into a <Tab> or <Step> does not count as a change, while
  // a change to the indentation inside it does (it shapes a mindmap or a front-matter config).
  for (const f of ownFences) {
    const lines = f.lines.map((l) => l.trimEnd());
    let common = null;
    for (const l of lines.filter(Boolean)) {
      const ind = l.match(/^\s*/)[0];
      if (common === null) common = ind;
      while (!ind.startsWith(common)) common = common.slice(0, -1);
    }
    f.text = lines.map((l) => l.slice((common ?? "").length)).join("\n");
  }
  const body = outside.map((o) => o.text).join("\n");
  const resolveRef = (p) => (p.startsWith("/") ? p.slice(1) : posix.normalize(posix.join(posix.dirname(rel), p)));
  const imports = [...body.matchAll(/^import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]+\.mdx)['"]/gm)]
    .map((m) => ({ name: m[1], target: resolveRef(m[2]) }));
  // Legacy form: <Snippet file="name.mdx" /> resolves under snippets/
  const snippetTags = [...body.matchAll(/<Snippet\s+file=["']([^"']+\.mdx)["']/g)].map((m) => `snippets/${m[1]}`);

  // Everything that renders diagrams, in document order: own fences, <Mermaid> tags, and each use
  // of an imported or <Snippet> snippet (a snippet imported under two names counts per import).
  const lineAt = (off) => outside.findLastIndex((o) => o.start <= off);
  const items = ownFences.map((f) => ({ at: f.at, off: -1, fence: f }));
  for (const m of body.matchAll(/<Mermaid[\s/>]/g)) {
    const k = lineAt(m.index);
    items.push({ at: k, off: m.index, tag: { line: outside[k].line, text: outside[k].text.trim() } });
  }
  for (const { name, target } of imports) {
    for (const m of body.matchAll(new RegExp(`<${name.replace(/\$/g, "\\$")}[\\s/>]`, "g"))) items.push({ at: lineAt(m.index), off: m.index, use: target });
  }
  for (const m of body.matchAll(/<Snippet\s+file=["']([^"']+\.mdx)["']/g)) items.push({ at: lineAt(m.index), off: m.index, use: `snippets/${m[1]}` });
  // A fence sits between outside lines at-1 and at, so it sorts before anything on line `at`.
  items.sort((a, b) => a.at - b.at || a.off - b.off);
  return { body, imports, snippetTags, items };
}

// The key a diagram is compared by at the base: a fence's text, or a <Mermaid> tag's line.
const diagramKey = (it) => (it.fence ? `fence:${it.fence.text}` : `tag:${it.tag.text}`);

// Every diagram an .mdx renders, in document order: its own mermaid fences and <Mermaid> tags, and
// each rendered snippet's diagrams expanded in place, once per use. Each entry: { file, line, key,
// nth, first } (nth = which copy of that key in its own file, from 1; first = the fence's first
// non-empty line). null when the file is missing.
export function diagramSources(root, rel, seen = new Set()) {
  const file = join(root, rel);
  if (seen.has(rel) || !existsSync(file)) return null;
  const s = scanMdx(readFileSync(file, "utf8"), rel);
  const inner = new Set([...seen, rel]);
  const out = [];
  const copies = new Map(); // key → copies seen so far in this file
  for (const it of s.items) {
    if (it.use) {
      out.push(...(diagramSources(root, it.use, inner) ?? []));
    } else {
      const own = it.fence || it.tag;
      const key = diagramKey(it);
      copies.set(key, (copies.get(key) ?? 0) + 1);
      const first = it.fence ? (it.fence.lines.find((l) => l.trim()) ?? "").trim() : it.tag.text;
      out.push({ file: rel, line: own.line, key, nth: copies.get(key), first });
    }
  }
  return out;
}

// Static expected diagram count of one .mdx: own fences + <Mermaid> tags + the count of each
// rendered snippet, once per use. null when the file is missing.
export function expectedDiagramCount(root, rel, seen = new Set()) {
  return diagramSources(root, rel, seen)?.length ?? null;
}

// Keys of the diagrams a file defines itself (no snippet expansion) at a git ref, each with its
// number of copies (a fence added as a copy of an existing one is new); null when the file does
// not exist there.
function diagramKeysAt(root, ref, rel) {
  let content;
  try {
    content = execFileSync("git", ["show", `${ref}:./${rel}`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 << 20 });
  } catch {
    return null;
  }
  const counts = new Map();
  for (const it of scanMdx(content, rel).items) {
    if (!it.use) counts.set(diagramKey(it), (counts.get(diagramKey(it)) ?? 0) + 1);
  }
  return counts;
}

// The commit the label floor compares with: the merge-base of ref and HEAD (as `--changed` diffs
// ref...HEAD), so a fence edited on the base branch alone does not count as changed here. Throws
// when ref is not a commit or has no common ancestor with HEAD.
function floorBaseCommit(root, ref) {
  assertCommit(root, ref);
  try {
    return execFileSync("git", ["merge-base", ref, "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    throw new Error(`base ref "${ref}" has no merge-base with HEAD in ${root}`);
  }
}

// Throws when ref does not name a commit in root's repository.
function assertCommit(root, ref) {
  let ok = !ref.startsWith("-");
  try {
    if (ok) execFileSync("git", ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], { cwd: root, stdio: "ignore" });
  } catch {
    ok = false;
  }
  if (!ok) throw new Error(`base ref "${ref}" is not a commit in ${root}`);
}

// Pages (and snippets) whose import resolves to a changed snippets/**/*.mdx, transitively.
export function snippetImporters(root, files) {
  const targets = new Set(files.map((f) => f.replace(/\\/g, "/")).filter((f) => /^snippets\/.+\.mdx$/.test(f)));
  if (targets.size === 0) return [];
  const refs = listMdx(root).map((rel) => {
    const s = scanMdx(readFileSync(join(root, rel), "utf8"), rel);
    return [rel, new Set([...s.imports.map((i) => i.target), ...s.snippetTags])];
  });
  const hosts = new Set();
  let frontier = [...targets];
  while (frontier.length) {
    const next = [];
    for (const [rel, uses] of refs) {
      if (hosts.has(rel) || targets.has(rel) || !frontier.some((t) => uses.has(t))) continue;
      hosts.add(rel);
      if (rel.startsWith("snippets/")) next.push(rel); // nested snippet: follow its importers
    }
    frontier = next;
  }
  return [...hosts].sort();
}

// Snippet references in an .mdx whose target file does not exist (a deleted or renamed snippet
// that a page still imports).
export function missingSnippetRefs(root, rel) {
  const s = scanMdx(readFileSync(join(root, rel), "utf8"), rel);
  return [...s.imports.map((i) => i.target), ...s.snippetTags].filter((t) => !existsSync(join(root, t)));
}

// The one changed-set helper for `validate.mjs --changed` and `render-check --changed`:
// staged + unstaged + untracked snippets (+ committed since baseRef, when given), and the
// importers of every changed snippet. git runs without a shell and with -z, so paths come back
// unquoted (spaces, non-ASCII) and a ref cannot inject a command. --no-renames lists a renamed
// or moved snippet under its old path too, so the pages still importing that path are selected.
// Throws when baseRef does not name a commit.
export function changedFilesWithImporters(root, { baseRef = null } = {}) {
  const git = (...args) => {
    try {
      return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
        .split("\0").filter(Boolean);
    } catch {
      return [];
    }
  };
  if (baseRef) assertCommit(root, baseRef);
  const changed = new Set([
    ...(baseRef ? git("diff", "--name-only", "--no-renames", "-z", `${baseRef}...HEAD`) : []),
    ...git("diff", "--name-only", "--no-renames", "-z", "HEAD"),
    ...git("diff", "--staged", "--name-only", "--no-renames", "-z"),
    ...git("ls-files", "--others", "--exclude-standard", "-z", "--", "snippets"),
  ]);
  return { changed: [...changed], hosts: snippetImporters(root, [...changed]) };
}

// ─── Browser mode (CDP over the WebSocket global) ───────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Label size for output, rounded down, so a failing 8.996 px never prints as 9.00.
const fmtPx = (n) => (Math.floor(n * 100) / 100).toFixed(2);

async function launchChrome() {
  const chrome = process.env.CHROME_PATH;
  if (!chrome || !existsSync(chrome)) {
    console.error("render-check --browser: set CHROME_PATH to a Chrome or Chromium binary" +
      (chrome ? ` (not found: ${chrome})` : "") + ".");
    process.exit(2);
  }
  if (typeof WebSocket === "undefined") {
    console.error("render-check --browser: no WebSocket global. On Node 20 run: node --experimental-websocket scripts/render-check.mjs --browser ...");
    process.exit(2);
  }
  const profile = mkdtempSync(join(tmpdir(), "render-check-"));
  // Own process group (detached), so one signal reaches Chrome and every helper process it starts.
  const proc = spawn(chrome, [
    "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
    "--no-first-run", "--no-default-browser-check", "--disable-gpu", "--hide-scrollbars",
    "--disable-breakpad", "--disable-crash-reporter", "about:blank",
  ], { stdio: "ignore", detached: true });
  const exited = new Promise((r) => proc.once("exit", () => r(true)));
  const killGroup = (sig) => { try { process.kill(-proc.pid, sig); } catch { /* already gone */ } };
  // Helper processes can outlive the main one for a moment and re-create the profile dir, so the
  // profile is removed only once the whole process group is gone.
  const groupAlive = () => { try { process.kill(-proc.pid, 0); return true; } catch { return false; } };
  const removeProfile = () => { try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch { /* best effort */ } };
  // Last resort on every other exit path (process.exit, Ctrl-C, kill): no orphaned Chrome.
  const onExit = () => {
    killGroup("SIGKILL");
    const wait = new Int32Array(new SharedArrayBuffer(4)); // synchronous sleep: no event loop here
    for (let i = 0; i < 40 && groupAlive(); i++) Atomics.wait(wait, 0, 0, 50);
    removeProfile();
  };
  const onSignal = (sig) => { onExit(); process.exit(sig === "SIGINT" ? 130 : 143); };
  process.once("exit", onExit);
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  // Normal stop: SIGTERM, wait for the group to exit (SIGKILL after 5 s), then remove the profile.
  const stop = async () => {
    killGroup("SIGTERM");
    await Promise.race([exited, sleep(5000)]);
    for (let i = 0; i < 20 && groupAlive(); i++) await sleep(250);
    if (groupAlive()) {
      killGroup("SIGKILL");
      for (let i = 0; i < 20 && groupAlive(); i++) await sleep(100);
    }
    removeProfile();
    process.removeListener("exit", onExit);
    process.removeListener("SIGINT", onSignal);
    process.removeListener("SIGTERM", onSignal);
  };

  let ws;
  try {
    // Chrome writes the port it picked to DevToolsActivePort once the debugger listens.
    const portFile = join(profile, "DevToolsActivePort");
    for (let i = 0; i < 120 && !existsSync(portFile); i++) await sleep(250);
    const port = existsSync(portFile) ? readFileSync(portFile, "utf8").split("\n")[0] : null;
    const target = port
      ? (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page")
      : null;
    if (!target) throw new Error("no debugging target");
    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((ok, fail) => {
      ws.addEventListener("open", ok, { once: true });
      ws.addEventListener("error", () => fail(new Error("WebSocket error")), { once: true });
    });
  } catch (e) {
    await stop();
    console.error(`render-check --browser: Chrome started but could not be driven (${e.message}; ${chrome}).`);
    process.exit(2);
  }
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { ok, fail } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) fail(new Error(m.error.message)); else ok(m.result);
    } else if (m.method) {
      for (const l of listeners) l(m);
    }
  });
  ws.addEventListener("close", () => {
    for (const { fail } of pending.values()) fail(new Error("CDP connection closed"));
    pending.clear();
  });
  // Every call has a deadline: a page with a blocked main thread never answers Runtime.evaluate.
  const send = (method, params = {}, timeoutMs = 30000) => new Promise((ok, fail) => {
    const i = ++id;
    const timer = setTimeout(() => { pending.delete(i); fail(new Error(`${method}: no reply in ${Math.round(timeoutMs)} ms`)); }, timeoutMs);
    pending.set(i, { ok: (v) => { clearTimeout(timer); ok(v); }, fail: (err) => { clearTimeout(timer); fail(err); } });
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  return { send, on: (fn) => listeners.push(fn), close: async () => { ws.close(); await stop(); } };
}

// Evaluated in the page. Each diagram is measured as mint lays it out at the viewport width (no
// container is resized): every label's computed font size × the screen scale
// of its SVG element (or of the foreignObject holding an HTML label). This catches any height
// cap or narrower SVG, which a viewBox-width estimate misses.
// Autonumber step markers (text.sequenceNumber, a fixed 12 px digit in a circle) are not labels.
// mint keeps an inactive <Tab> panel in the DOM with display: none, and an <Accordion> is a
// <details>: such a diagram is shown (and its <details> opened) for the measurement, as a reader
// sees it after a click, and put back afterwards. A diagram still not laid out (0 px container, or
// text but no label with a layout box) is reported as not measurable.
const SNAPSHOT = `(async () => {
  const isError = (s) => s.getAttribute("aria-roledescription") === "error" || /Syntax error/.test(s.textContent);
  const containers = [...document.querySelectorAll('[data-component-name="mermaid-container"]')];
  const restore = [];
  const shown = containers.map((c) => {
    let hidden = false;
    for (let el = c; el && el !== document.documentElement; el = el.parentElement) {
      if (el instanceof HTMLDetailsElement && !el.open) {
        el.open = true;
        restore.push(() => { el.open = false; });
        hidden = true;
      }
      if (getComputedStyle(el).display === "none") {
        const value = el.style.getPropertyValue("display"), priority = el.style.getPropertyPriority("display");
        el.style.setProperty("display", "block", "important");
        restore.push(() => el.style.setProperty("display", value, priority));
        hidden = true;
      }
    }
    return hidden;
  });
  try {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const diagrams = containers.map((c, i) => {
      const container = Math.round(c.getBoundingClientRect().width);
      const svg = c.querySelector("svg[aria-roledescription]");
      if (!svg) return { svg: false, container, hidden: shown[i] };
      const width = svg.viewBox.baseVal && svg.viewBox.baseVal.width || svg.getBBox().width;
      let minLabel = Infinity, minFont = null, texts = 0, laidOut = 0;
      for (const el of svg.querySelectorAll("*")) {
        if (["style", "title", "desc"].includes(el.tagName.toLowerCase()) || el.classList.contains("sequenceNumber")) continue;
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        texts++;
        if (!el.getClientRects().length) continue; // not rendered
        const scaled = el instanceof SVGGraphicsElement ? el : el.closest("foreignObject");
        const m = scaled && scaled.getScreenCTM();
        if (!m) continue;
        laidOut++;
        const font = parseFloat(getComputedStyle(el).fontSize);
        const px = font * Math.hypot(m.a, m.b);
        if (px < minLabel) { minLabel = px; minFont = font; }
      }
      const labelled = Number.isFinite(minLabel);
      return {
        svg: true, error: isError(svg), width: Math.round(width), hidden: shown[i],
        container, rendered: Math.round(svg.getBoundingClientRect().width),
        minFont, minLabel: labelled ? minLabel : null, texts,
        measurable: container > 0 && (texts === 0 || laidOut > 0),
      };
    });
    const errorSvgs = [...document.querySelectorAll("svg")].filter(isError).length;
    return JSON.stringify({ ready: document.readyState === "complete", containers: containers.length, diagrams, errorSvgs });
  } finally {
    for (const undo of restore.reverse()) undo();
  }
})()`;

// Console arguments as text: primitives, Error stacks, and a plain object's previewed properties
// (its description is only "Object").
const argText = (a) => {
  if (a.value !== undefined) return String(a.value);
  if (a.type !== "object" || a.subtype === "error") return a.description;
  const props = a.preview?.properties || [];
  return props.length ? `{${props.map((p) => `${p.name}: ${p.value ?? p.type}`).join(", ")}}` : null;
};

// floor: { sourcesFor(route) → diagramSources list or null, classify(source) → { blocking, why } }.
// Returns the failed routes and the older (warn-only) diagrams below the label floor.
async function browserCheck(routes, expectedFor, timeoutMs, floor) {
  const cdp = await launchChrome();
  const logs = [];
  const docStatus = new Map(); // requestId (= loaderId for a navigation) → HTTP status
  let onLoad = () => {};
  cdp.on((m) => {
    if (m.method === "Page.loadEventFired") {
      onLoad();
    } else if (m.method === "Network.responseReceived" && m.params.type === "Document") {
      docStatus.set(m.params.requestId, m.params.response.status);
    } else if (m.method === "Runtime.exceptionThrown") {
      const d = m.params.exceptionDetails;
      logs.push(`uncaught exception: ${(d.exception?.description || d.text || "").split("\n")[0].slice(0, 200)}`);
    } else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
      const text = m.params.args.map(argText).filter((t) => t != null && t !== "").join(" ");
      logs.push(`console error: ${(text || "(object argument)").split("\n")[0].slice(0, 200)}`);
    } else if (m.method === "Log.entryAdded" && m.params.entry.level === "error" && !/\/favicon\.ico$/.test(m.params.entry.url || "")) {
      // Browser-generated errors (failed resource loads, CSP, ...) never reach the console API.
      // The favicon request is the browser's own, not the page's.
      const { text, url } = m.params.entry;
      logs.push(`browser error: ${text.split("\n")[0].slice(0, 160)}${url ? ` (${url.slice(0, 120)})` : ""}`);
    }
  });

  // One route: navigate, check the page's HTTP status, wait for the load event (so the previous
  // route is never measured), then poll until the expected diagrams have SVGs, an error shows, or
  // the timeout passes. Every CDP call is bounded by the same deadline.
  async function measure(r, expected) {
    logs.length = 0;
    const deadline = Date.now() + timeoutMs;
    const left = () => Math.max(1000, deadline - Date.now());
    const loaded = new Promise((ok) => { onLoad = ok; });
    let nav;
    try {
      nav = await cdp.send("Page.navigate", { url: `${BASE_URL}/${r}` }, left());
    } catch (e) {
      return { failure: `navigation failed: ${e.message}` };
    }
    if (nav.errorText) return { failure: `navigation failed: ${nav.errorText}` };
    await Promise.race([loaded, sleep(left())]);
    const status = docStatus.get(nav.loaderId);
    if (!(status >= 200 && status < 400)) {
      return { failure: status === undefined ? "no HTTP response recorded for the page" : `HTTP ${status} (expected 2xx/3xx)` };
    }
    let snap = null;
    for (;;) {
      await sleep(500);
      const res = await cdp.send("Runtime.evaluate", { expression: SNAPSHOT, returnByValue: true, awaitPromise: true }, left()).catch(() => null);
      if (res?.result?.value) snap = JSON.parse(res.result.value);
      const settled = snap && snap.ready && snap.diagrams.every((d) => d.svg) &&
        (snap.errorSvgs > 0 || snap.containers >= (expected ?? 0));
      if (settled || logs.some((l) => l.startsWith("uncaught")) || Date.now() > deadline) break;
    }
    if (snap && expected === 0) await sleep(1000); // nothing to wait for: give late errors a moment
    return { snap };
  }

  const bad = [];
  const older = [];
  try {
    await cdp.send("Runtime.enable");
    await cdp.send("Page.enable");
    await cdp.send("Network.enable");
    await cdp.send("Log.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: VIEWPORT_WIDTH, height: 1000, deviceScaleFactor: 1, mobile: false });
    for (const r of routes) {
      const expected = expectedFor(r);
      const { snap = null, failure } = await measure(r, expected);
      const reasons = [];
      const notes = []; // printed, not failing
      if (failure) {
        reasons.push(failure);
      } else if (!snap) {
        reasons.push("page never evaluated (no reply before the timeout)");
      } else {
        const svgs = snap.diagrams.filter((d) => d.svg).length;
        if (expected === null) reasons.push("no source .mdx for the expected count (pass <route>=<count>)");
        else if (snap.containers !== expected) reasons.push(`diagram count ${snap.containers} ≠ expected ${expected}`);
        if (svgs !== snap.containers) reasons.push(`${snap.containers - svgs} of ${snap.containers} container(s) without an SVG (timeout ${timeoutMs} ms)`);
        if (snap.errorSvgs) reasons.push(`${snap.errorSvgs} Mermaid error SVG(s) (Syntax error)`);
        // Rendered diagram i is source i (document order). Without that mapping (the counts differ,
        // which the count check above normally fails already) every diagram below the floor blocks.
        const sources = floor.sourcesFor(r);
        const mapped = sources && sources.length === snap.containers;
        if (!sources) {
          notes.push(`label floor: no source .mdx to map the diagrams to — every diagram below ${MIN_LABEL_PX} px blocks`);
        } else if (!mapped) {
          // A pinned count (route=N) can match the page while the source differs: the count check
          // then passes, and only the diagrams below the floor block (source not mapped).
          const why = expected === snap.containers ? `pinned count ${expected}` : "the count check fails on this";
          notes.push(`label floor: ${snap.containers} rendered diagram(s) cannot be mapped to ${sources.length} source diagram(s) — every diagram below ${MIN_LABEL_PX} px blocks (${why})`);
        }
        snap.diagrams.forEach((d, i) => {
          if (!d.svg || (d.measurable && (d.minLabel === null || d.minLabel >= MIN_LABEL_PX))) return;
          const src = mapped ? sources[i] : null;
          const { blocking, why } = src ? floor.classify(src) : { blocking: true, why: "source not mapped" };
          const at = src ? `, ${src.file}:${src.line}` : "";
          const msg = d.measurable
            ? `diagram ${i + 1}: smallest label ${fmtPx(d.minLabel)} px rendered in a ${d.container} px container (${d.minFont} px font, ${d.width} px wide) < ${MIN_LABEL_PX} px [${why}${at}]`
            : `diagram ${i + 1}: label size not measurable (${d.container} px container, ${d.texts} text label(s), none laid out) [${why}${at}]`;
          if (blocking) {
            reasons.push(msg);
          } else {
            notes.push(`WARN ${msg}`);
            older.push({ route: r, index: i + 1, src, px: d.measurable ? d.minLabel : null, container: d.container });
          }
        });
      }
      reasons.push(...logs);
      const counts = snap
        ? `expected=${expected ?? "?"} containers=${snap.containers} svgs=${snap.diagrams.filter((d) => d.svg).length} error-svgs=${snap.errorSvgs} console-errors=${logs.length}`
        : `expected=${expected ?? "?"}`;
      console.log(`${reasons.length ? "FAIL" : "PASS"}  ${r}  ${counts}`);
      (snap?.diagrams || []).forEach((d, i) => {
        const where = d.hidden ? " (hidden tab or closed accordion, shown for the measurement)" : "";
        if (!d.svg) {
          console.log(`        diagram ${i + 1}: no SVG in a ${d.container} px container${where}`);
          return;
        }
        const label = !d.measurable ? "label size not measurable"
          : d.minLabel !== null ? `smallest label ${d.minFont} px font → ${fmtPx(d.minLabel)} px rendered` : "no text labels";
        console.log(`        diagram ${i + 1}: ${d.width} px wide, drawn ${d.rendered} px in a ${d.container} px container${where}, ${label}`);
      });
      for (const note of notes) console.log(`        ! ${note}`);
      for (const reason of reasons) console.log(`        ✗ ${reason}`);
      if (reasons.length) bad.push(r);
    }
  } finally {
    await cdp.close();
  }
  return { bad, older };
}

// ─── CLI ────────────────────────────────────────────────────────────────────

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function main() {
  const args = process.argv.slice(2);
  const changedOnly = args.includes("--changed");
  const browser = args.includes("--browser");
  const baseIdx = args.indexOf("--base");
  const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : process.env.RENDER_CHECK_BASE || "origin/main";
  const timeoutIdx = args.indexOf("--timeout");
  const timeoutMs = timeoutIdx >= 0 ? Number(args[timeoutIdx + 1]) : 60000;
  const usage = (msg) => { console.error(`render-check: ${msg}`); process.exit(2); };
  if (baseIdx >= 0 && (!baseRef || baseRef.startsWith("--"))) usage("--base takes a git ref (e.g. --base HEAD).");
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) usage("--timeout takes a positive number of milliseconds (e.g. --timeout 60000).");
  // Explicit routes: positional args, optionally with a pinned expected count (route=7).
  const explicit = args
    .filter((a, i) => !a.startsWith("--") && (baseIdx < 0 || i !== baseIdx + 1) && (timeoutIdx < 0 || i !== timeoutIdx + 1))
    .map((a) => {
      const [route, n] = a.split("=");
      return { route: route.replace(/^\//, "").replace(/\.mdx$/, ""), expected: n === undefined ? undefined : Number(n) };
    });

  // Collect internal page routes from docs.json — ONLY strings that are elements of a `pages`
  // array (real page paths). Walking every string would wrongly pick up `icon` values etc.
  const docs = JSON.parse(readFileSync(join(ROOT, "docs.json"), "utf8"));
  const pages = new Set();
  function collectFromPages(arr) {
    for (const item of arr) {
      if (typeof item === "string" && !/^https?:/.test(item)) pages.add(item);
      else if (item && typeof item === "object" && Array.isArray(item.pages)) collectFromPages(item.pages);
    }
  }
  (function walk(x) {
    if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === "object") {
      if (Array.isArray(x.pages)) collectFromPages(x.pages);
      for (const k in x) if (k !== "pages") walk(x[k]);
    }
  })(docs.navigation || docs);
  let routes = [...pages].filter((p) => /^[a-z]/.test(p));

  if (explicit.length) {
    routes = explicit.map((e) => e.route);
  } else if (changedOnly) {
    let changed, hosts;
    try {
      ({ changed, hosts } = changedFilesWithImporters(ROOT, { baseRef }));
    } catch (e) {
      usage(`--changed: ${e.message} (pass --base <ref> or set RENDER_CHECK_BASE).`);
    }
    if (hosts.length) console.log(`render-check: snippet importers added: ${hosts.join(", ")}`);
    const changedRoutes = new Set(
      [...changed, ...hosts].filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
    );
    routes = routes.filter((r) => changedRoutes.has(r));
    if (routes.length === 0) {
      console.log("render-check: no changed .mdx nav routes — skipping.");
      process.exit(0);
    }
  }

  if (browser) {
    const pinned = new Map(explicit.filter((e) => e.expected !== undefined).map((e) => [e.route, e.expected]));
    const expectedFor = (r) => (pinned.has(r) ? pinned.get(r) : expectedDiagramCount(ROOT, `${r}.mdx`));
    // Label-floor base (S15): the --base ref, default HEAD (uncommitted edits are the new
    // diagrams), also with --changed ($RENDER_CHECK_BASE and the origin/main default set only the
    // page set). Compared at its merge-base with HEAD, the same point `--changed` diffs from.
    const floorAll = args.includes("--floor-all");
    const floorRef = baseIdx >= 0 ? baseRef : "HEAD";
    let floorBase = null;
    let floorName = floorRef;
    const at = floorRef === "HEAD" ? "HEAD" : `the ${floorRef} merge-base`; // in each diagram's reason
    if (!floorAll) {
      try {
        floorBase = floorBaseCommit(ROOT, floorRef);
      } catch (e) {
        usage(`label floor: ${e.message} (pass --base <ref>, or --floor-all to block on every diagram).`);
      }
      floorName = floorRef === "HEAD" ? `HEAD at ${floorBase.slice(0, 7)}` : `the merge-base of ${floorRef} and HEAD, ${floorBase.slice(0, 7)}`;
    }
    const baseKeys = new Map(); // file → its diagram keys and copies at floorBase (null: not there)
    const floor = {
      sourcesFor: (r) => diagramSources(ROOT, `${r}.mdx`),
      classify: (src) => {
        if (floorAll) return { blocking: true, why: "--floor-all" };
        if (src.file.startsWith(SHARED_DIAGRAMS_DIR)) return { blocking: true, why: "shared snippet diagram" };
        if (!baseKeys.has(src.file)) baseKeys.set(src.file, diagramKeysAt(ROOT, floorBase, src.file));
        const keys = baseKeys.get(src.file);
        if (!keys) return { blocking: true, why: `new: file not at ${at}` };
        if ((keys.get(src.key) ?? 0) < src.nth) return { blocking: true, why: `new or changed since ${at}` };
        return { blocking: false, why: `unchanged since ${at}` };
      },
    };
    const scope = floorAll ? "every diagram blocks (--floor-all)" : `blocks shared and new/changed diagrams vs ${floorName}, warns on older ones`;
    console.log(`render-check --browser: ${routes.length} route(s) against ${BASE_URL} (preview: mint@${MINT_VERSION}; labels ≥ ${MIN_LABEL_PX} px at a ${VIEWPORT_WIDTH} px viewport; floor ${scope})`);
    const { bad, older } = await browserCheck(routes, expectedFor, timeoutMs, floor);
    if (!floorAll) {
      console.log(`\nOlder diagrams below ${MIN_LABEL_PX} px (fence unchanged at ${floorName}; WARN, not failing) — ${older.length}${older.length ? ":" : ""}`);
      for (const o of older) {
        const size = o.px === null ? "label size not measurable" : `${fmtPx(o.px)} px`;
        console.log(`  ${o.route}  diagram ${o.index}  ${o.src.file}:${o.src.line}  ${o.src.first}  ${size} (${o.container} px container)`);
      }
    }
    if (bad.length) {
      console.error(`\n❌ render-check --browser FAILED — ${bad.length}/${routes.length} route(s):\n` + bad.map((b) => "  " + b).join("\n"));
      process.exit(1);
    }
    console.log(`\n✅ render-check --browser PASS — ${routes.length}/${routes.length} routes render their diagrams.`);
    process.exit(0);
  }

  console.log(`render-check: ${routes.length} route(s) against ${BASE_URL}`);
  const bad = [];
  for (const r of routes) {
    let status = 0;
    try {
      const res = await fetch(`${BASE_URL}/${r}`, { redirect: "manual" });
      status = res.status;
    } catch {
      status = -1; // connection error
    }
    if (!(status >= 200 && status < 400)) bad.push(`${r} [${status}]`);
  }

  if (bad.length) {
    console.error(
      `\n❌ render-check FAILED — ${bad.length} route(s) did not render (expected 2xx/3xx):\n` +
        bad.map((b) => "  " + b).join("\n")
    );
    process.exit(1);
  }
  console.log(`\n✅ render-check PASS — ${routes.length}/${routes.length} routes render.`);
}

// Run only as a script: validate.mjs and check-md-export.mjs import the helpers above.
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  await main();
}
