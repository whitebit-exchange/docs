#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";

// Fast lane (opt-in): DOCS_FAST=1 skips the headless TCR gate. The static
// validators in .husky/pre-commit still run. Guarded here too so a direct
// `node scripts/invoke-tcr-hook.mjs` honors the same opt-out.
if (process.env.DOCS_FAST && process.env.DOCS_FAST !== "0") {
  console.log("DOCS_FAST set — skipping /task-completion-review (fast lane).");
  process.exit(0);
}

const diff = execSync("git diff --staged", { encoding: "utf-8" });

if (!diff) {
  process.exit(0);
}

// Skip TCR for commits that touch no documentation content. TCR reviews docs;
// scripts, husky config, CI, lock files, package.json, etc. have nothing for
// it to review.
const stagedFiles = execSync("git diff --staged --name-only", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .filter(Boolean);
const DOC_FILE_RE = /\.(md|mdx|ya?ml)$/i;

if (!stagedFiles.some((f) => DOC_FILE_RE.test(f))) {
  console.log("No doc-content changes in staged set — skipping TCR.");
  process.exit(0);
}

// Gate mode: the headless pre-commit review runs a leaner path than the
// interactive skill — terse findings-only output, no glossary/learnings steps,
// bounded ripple read-set (see task-completion-review SKILL.md "Gate mode").
// Model defaults to sonnet for speed/cost; override with TCR_MODEL=opus for a
// deeper review on large or wide-ripple diffs.
const TCR_MODEL = process.env.TCR_MODEL || "sonnet";
console.log(`Running /task-completion-review (gate mode, model: ${TCR_MODEL}) via Claude Code…`);
console.log("Usually a couple of minutes; longer on large or wide-ripple diffs.");
console.log("Fast lane for small edits: DOCS_FAST=1 git commit. Full bypass: git commit --no-verify\n");

const result = spawnSync(
  "claude",
  [
    "-p", "/task-completion-review --gate",
    "--model", TCR_MODEL,
    "--output-format", "json",
    "--no-session-persistence",
  ],
  { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] },
);

if (result.error) {
  console.error("✗ Failed to spawn `claude` CLI:", result.error.message);
  console.error("  Ensure Claude Code is installed and on PATH.");
  console.error("  Emergency bypass: git commit --no-verify");
  process.exit(1);
}

if (result.status !== 0) {
  console.error("✗ `claude -p` exited with status", result.status);
  console.error(result.stderr || result.stdout);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(result.stdout);
} catch {
  console.error("✗ Could not parse `claude -p` output as JSON. Raw stdout:");
  console.error(result.stdout);
  process.exit(1);
}

if (parsed.is_error) {
  console.error("✗ Claude reported an error during TCR:");
  console.error(parsed.result || parsed.error || JSON.stringify(parsed, null, 2));
  process.exit(1);
}

const report = parsed.result || "";
console.log(report);
console.log("");
console.log(`[TCR finished in ${((parsed.duration_ms ?? 0) / 1000).toFixed(1)}s]`);

if (/VERDICT:\s*FAIL/i.test(report)) {
  console.error("\n✗ TCR returned VERDICT: FAIL — commit blocked.");
  console.error("  Address the ERROR findings above, then re-stage and commit.");
  console.error("  Emergency bypass: git commit --no-verify (see ai/RULES.md §2.1).");
  process.exit(1);
}

if (!/VERDICT:\s*PASS/i.test(report)) {
  console.error("\n⚠ TCR did not emit a clear `VERDICT: PASS` line — blocking by default.");
  console.error("  Re-run /task-completion-review interactively to inspect, or bypass with --no-verify.");
  process.exit(1);
}

console.log("\n✓ TCR PASSED — continuing with commit.");
