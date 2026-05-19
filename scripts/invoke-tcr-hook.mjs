#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";

const diff = execSync("git diff --staged", { encoding: "utf-8" });

if (!diff) {
  process.exit(0);
}

// Skip TCR for commits that touch no documentation content. TCR reviews docs;
// lock files, scripts, husky config, CI, package.json, etc. have nothing for it
// to review and would just burn ~40 s and ~$0.13 per commit.
const stagedFiles = execSync("git diff --staged --name-only", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .filter(Boolean);
const DOC_FILE_RE = /\.(md|mdx)$|^(openapi|asyncapi|data)\/.*\.ya?ml$|^docs\.json$/i;

if (!stagedFiles.some((f) => DOC_FILE_RE.test(f))) {
  console.log("No doc-content changes in staged set — skipping TCR.");
  process.exit(0);
}

console.log("Running /task-completion-review via Claude Code (Sonnet 4.6, $1.00 cap)…");
console.log("This may take 1–3 minutes. To bypass: git commit --no-verify\n");

const result = spawnSync(
  "claude",
  [
    "-p", "/task-completion-review",
    "--output-format", "json",
    "--model", "sonnet",
    "--max-budget-usd", "1.00",
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
console.log(
  `[TCR finished — cost: $${(parsed.total_cost_usd ?? 0).toFixed(4)}, ` +
    `duration: ${((parsed.duration_ms ?? 0) / 1000).toFixed(1)}s]`,
);

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
