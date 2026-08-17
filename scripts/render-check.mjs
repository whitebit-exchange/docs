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
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node scripts/render-check.mjs            # full nav sweep
 *   BASE_URL=http://localhost:3000 node scripts/render-check.mjs --changed  # changed pages only
 *     --base <ref>   base git ref for --changed diff (default: $RENDER_CHECK_BASE or origin/main)
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const args = process.argv.slice(2);
const changedOnly = args.includes("--changed");
const baseIdx = args.indexOf("--base");
const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : process.env.RENDER_CHECK_BASE || "origin/main";

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

if (changedOnly) {
  let changed = [];
  for (const cmd of [`git diff --name-only ${baseRef}...HEAD`, "git diff --name-only HEAD"]) {
    try {
      changed = execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim().split("\n").filter(Boolean);
      if (changed.length) break;
    } catch { /* try next */ }
  }
  const changedRoutes = new Set(
    changed.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
  );
  routes = routes.filter((r) => changedRoutes.has(r));
  if (routes.length === 0) {
    console.log("render-check: no changed .mdx nav routes — skipping.");
    process.exit(0);
  }
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
