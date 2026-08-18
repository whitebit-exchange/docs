#!/usr/bin/env node

/**
 * AI-infrastructure consistency lint (warn-only).
 *
 * AI-infra-only commits skip the headless TCR gate by design (RULES §2.3), so no
 * review pass covers drift inside ai/**. This lint mechanically catches the drift
 * classes found in the 2026-07-02 learning-pipeline audit: phantom skill references,
 * stale path prefixes, registration desync, oversized SKILL.md files, broken
 * references/ links, malformed LESSONS/hypotheses structure, and Amendment Log
 * ordering.
 *
 * Warn-only: always exits 0. Escalate to blocking only after the warning stream
 * has proven quiet (see ai/inputs/learning-pipeline-improvement-plan.md #16).
 *
 * Usage:
 *   node scripts/validate-ai-infra.mjs
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SKILLS_DIR = join(ROOT, "ai", "skills");
const GOVERNANCE_FILES = ["CLAUDE.md", "AGENTS.md", join("ai", "agent.md")];
// The grep set from RULES §4.4 — durable AI infra, excluding local-only or
// historical directories (ai/inputs, ai/outputs, ai/tmp, ai/retrospectives, ai/specs).
const SCAN_ROOTS = [
  join("ai", "RULES.md"),
  join("ai", "README.md"),
  join("ai", "agent.md"),
  join("ai", "LESSONS.md"),
  join("ai", "skills"),
  join("ai", "style-guides"),
  join("ai", "cheatsheets"),
  join("ai", "how-to"),
  "CLAUDE.md",
  "AGENTS.md",
];

const LESSONS_SECTIONS = ["Process", "Style", "Tooling", "Pipeline Design", "Skills System"];
const HYPOTHESIS_CATEGORIES = [
  "Consistency", "Speed", "Quality", "Cognitive Load",
  "Knowledge Retention", "Coverage", "Observability",
];
const HYPOTHESIS_STATUSES = ["PENDING", "CONFIRMED", "REFUTED", "INCONCLUSIVE", "SUPERSEDED"];
// Category rule enforced for entries dated on/after this; earlier entries are
// grandfathered (they are historical records, not to be retro-edited).
const HYPOTHESIS_ENFORCE_FROM = "2026-07-01";

let warnings = 0;
function warn(msg) {
  warnings++;
  console.log(`  ⚠  ${msg}`);
}

function read(rel) {
  // Normalize BOM and CRLF so structural regexes behave uniformly.
  return readFileSync(join(ROOT, rel), "utf-8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
}

function collectMarkdownFiles(entry) {
  const abs = join(ROOT, entry);
  if (!existsSync(abs)) return [];
  if (statSync(abs).isFile()) return [entry];
  const out = [];
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const rel = join(entry, e.name);
    if (e.isDirectory()) out.push(...collectMarkdownFiles(rel));
    else if (e.name.endsWith(".md")) out.push(rel);
  }
  return out;
}

// ─── 1. Skill structure: frontmatter name, size, references resolve ─────────

const skillDirs = existsSync(SKILLS_DIR)
  ? readdirSync(SKILLS_DIR, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
  : [];

for (const name of skillDirs) {
  const skillFile = join("ai", "skills", name, "SKILL.md");
  if (!existsSync(join(ROOT, skillFile))) {
    warn(`${skillFile} missing — every skill directory needs a SKILL.md`);
    continue;
  }
  const content = read(skillFile);
  const lines = content.split("\n");

  if (lines.length > 500) {
    warn(`${skillFile} is ${lines.length} lines (>500) — move detail to references/`);
  }

  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  const fmName = fm && fm[1].match(/^name:\s*(\S+)\s*$/m);
  if (!fm) warn(`${skillFile} has no frontmatter block`);
  else if (!fmName) warn(`${skillFile} frontmatter has no name: field`);
  else if (fmName[1] !== name) warn(`${skillFile} frontmatter name "${fmName[1]}" ≠ directory "${name}"`);

  // Local references/ and scripts/ mentions must resolve inside the skill dir
  // (or, for scripts/, at the repo root). The lookbehind excludes matches that
  // are the tail of a longer path (e.g. ai/skills/<other>/references/x.md).
  // Fenced code blocks are stripped first — they hold illustrative templates,
  // not real pointers.
  const prose = content.replace(/^```[\s\S]*?^```/gm, "");
  const localRefs = new Set();
  for (const m of prose.matchAll(/(?<![\w/-])(?:references|scripts)\/[A-Za-z0-9._/-]+\.(?:md|json|mjs|js)/g)) {
    localRefs.add(m[0]);
  }
  for (const ref of localRefs) {
    const inSkill = existsSync(join(SKILLS_DIR, name, ref));
    const atRoot = ref.startsWith("scripts/") && existsSync(join(ROOT, ref));
    if (!inSkill && !atRoot) {
      warn(`${skillFile} references ${ref} which does not exist under ai/skills/${name}/`);
    }
  }
}

// ─── 2. Registration sync + path-reference integrity ────────────────────────

const governance = GOVERNANCE_FILES.map((f) => ({ file: f, content: existsSync(join(ROOT, f)) ? read(f) : "" }));

for (const name of skillDirs) {
  // Governance tables use the kebab slug (`stop-slop`), a spaced display name
  // (`AI improvement tracker`), or a mixed form (`Cross-document impact`) —
  // normalize hyphens to spaces on both sides before comparing.
  const needle = name.replace(/-/g, " ").toLowerCase();
  for (const g of governance) {
    if (!g.content) continue;
    const haystack = g.content.toLowerCase().replace(/-/g, " ");
    if (!haystack.includes(needle)) {
      warn(`skill "${name}" is not mentioned in ${g.file} — registration desync`);
    }
  }
}

const scanFiles = SCAN_ROOTS.flatMap(collectMarkdownFiles);
const skillSet = new Set(skillDirs);
for (const file of scanFiles) {
  const content = read(file);
  // Phantom ai/skills/<name> path references
  for (const m of content.matchAll(/ai\/skills\/([a-z0-9-]+)/g)) {
    if (!skillSet.has(m[1])) {
      warn(`${file} references ai/skills/${m[1]} — no such skill directory`);
    }
  }
  // Stale `.ai/` path prefix (template leftover)
  for (const m of content.matchAll(/(^|[^a-zA-Z0-9_/.])\.ai\//gm)) {
    warn(`${file} contains a stale ".ai/" path prefix (project uses "ai/")`);
    break; // one warning per file is enough
  }
}

// ─── 3. LESSONS.md canonical structure ───────────────────────────────────────

if (existsSync(join(ROOT, "ai", "LESSONS.md"))) {
  const lessons = read(join("ai", "LESSONS.md"));
  const sections = [...lessons.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  for (const s of LESSONS_SECTIONS) {
    if (!sections.includes(s)) warn(`ai/LESSONS.md is missing the "## ${s}" section`);
  }
  for (const s of sections) {
    if (!LESSONS_SECTIONS.includes(s)) {
      warn(`ai/LESSONS.md has unexpected section "## ${s}"`);
    }
  }
}

// ─── 4. Amendment Log date ordering (append-order = chronological) ──────────

if (existsSync(join(ROOT, "ai", "RULES.md"))) {
  const rules = read(join("ai", "RULES.md"));
  const logIdx = rules.indexOf("## Amendment Log");
  if (logIdx >= 0) {
    const dates = [...rules.slice(logIdx).matchAll(/^\| (\d{4}-\d{2}-\d{2}) \|/gm)].map((m) => m[1]);
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] < dates[i - 1]) {
        warn(`ai/RULES.md Amendment Log out of order: ${dates[i]} appears after ${dates[i - 1]}`);
      }
    }
  } else {
    warn("ai/RULES.md has no Amendment Log section");
  }
}

// ─── 5. Improvement hypotheses: single category, closed status set ───────────

if (existsSync(join(ROOT, "ai", "improvement-hypotheses.md"))) {
  const hyp = read(join("ai", "improvement-hypotheses.md"));
  let currentDate = "0000-00-00";
  let currentTitle = "";
  for (const line of hyp.split("\n")) {
    const dateH = line.match(/^## (\d{4}-\d{2}-\d{2})/);
    if (dateH) { currentDate = dateH[1]; continue; }
    const entryH = line.match(/^### (.+)/);
    if (entryH) { currentTitle = entryH[1].slice(0, 60); continue; }
    const cat = line.match(/^- \*\*Category:\*\* (.+)$/);
    if (cat && currentDate >= HYPOTHESIS_ENFORCE_FROM) {
      const value = cat[1].trim();
      if (!HYPOTHESIS_CATEGORIES.includes(value)) {
        warn(`improvement-hypotheses.md "${currentTitle}": Category "${value}" is not a single value from the taxonomy`);
      }
    }
    const status = line.match(/^- \*\*Status:\*\* (.+)$/);
    if (status && !HYPOTHESIS_STATUSES.includes(status[1].trim().split(" ")[0])) {
      warn(`improvement-hypotheses.md "${currentTitle}": Status "${status[1].trim()}" not in ${HYPOTHESIS_STATUSES.join("/")}`);
    }
  }
}

// ─── 6. tracked-lessons.json parses and entries are well-formed ──────────────

const trackedPath = join("ai", "skills", "session-retrospective", "references", "tracked-lessons.json");
if (existsSync(join(ROOT, trackedPath))) {
  try {
    const tracked = JSON.parse(read(trackedPath));
    tracked.forEach((entry, i) => {
      for (const key of ["date", "name", "scopeSrc", "regex"]) {
        if (!entry[key]) warn(`${trackedPath}[${i}] missing "${key}"`);
      }
      if (entry.scopeSrc && !["userMsg", "errorText"].includes(entry.scopeSrc)) {
        warn(`${trackedPath}[${i}] scopeSrc "${entry.scopeSrc}" must be userMsg or errorText`);
      }
      try { new RegExp(entry.regex, entry.flags || ""); }
      catch { warn(`${trackedPath}[${i}] regex does not compile: ${entry.regex}`); }
    });
  } catch (e) {
    warn(`${trackedPath} is not valid JSON: ${e.message}`);
  }
}

// ─── Result ──────────────────────────────────────────────────────────────────

if (warnings === 0) {
  console.log("  ✅ AI infra — PASS");
} else {
  console.log(`\n  ⚠  AI infra — ${warnings} warning(s) (not blocking)`);
}
process.exit(0);
