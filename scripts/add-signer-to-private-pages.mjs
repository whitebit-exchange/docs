#!/usr/bin/env node
/**
 * Adds `<WhitebitSigner>` to every private API reference MDX page.
 *
 * For each .mdx file whose frontmatter has:
 *   openapi: "/openapi/private/..."
 *
 * The script:
 * 1. Extracts the HTTP path from the openapi directive.
 * 2. Groups the new import with any existing imports (MDX requires all
 *    imports before JSX content).
 * 3. Inserts <WhitebitSigner> immediately after the last import.
 * 4. Skips files that already contain WhitebitSigner.
 *
 * Usage: node scripts/add-signer-to-private-pages.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const API_REF = join(ROOT, "api-reference");
const DRY_RUN = process.argv.includes("--dry-run");

const OPENAPI_LINE_RE =
  /^openapi:\s*["']?\/openapi\/private\/[^"'\s]+\s+\w+\s+(\/[^"'\s]+)["']?\s*$/m;

function walk(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, results);
    } else if (entry.endsWith(".mdx")) {
      results.push(full);
    }
  }
  return results;
}

function transformFile(src, endpointPath) {
  const importLine = `import { WhitebitSigner } from '/snippets/WhitebitSigner.jsx';`;
  const componentLine = `\n<WhitebitSigner path="${endpointPath}" />\n`;

  // Locate the end of the frontmatter block (second occurrence of "---")
  const fmEnd = src.indexOf("---", 3);
  if (fmEnd === -1) return null;

  const afterFmOffset = fmEnd + 3; // index of char right after closing ---
  const body = src.slice(afterFmOffset); // everything after frontmatter

  // Split body into lines so we can find the import block
  const lines = body.split("\n");

  // Find the index of the last import line (may be followed by blank lines)
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s/.test(lines[i])) {
      lastImportIdx = i;
    } else if (lastImportIdx !== -1 && lines[i].trim() !== "") {
      // First non-blank, non-import line after the import block — stop
      break;
    }
  }

  let newBody;
  if (lastImportIdx === -1) {
    // No existing imports — put import + component at the very start
    newBody = `\n${importLine}\n${componentLine}\n` + body;
  } else {
    // Insert our import right after the last existing import line,
    // then the component on the next non-blank line.
    const beforeImports = lines.slice(0, lastImportIdx + 1).join("\n");
    const afterImports = lines.slice(lastImportIdx + 1).join("\n");
    newBody = beforeImports + "\n" + importLine + "\n" + componentLine + afterImports;
  }

  return src.slice(0, afterFmOffset) + newBody;
}

let updated = 0;
let skipped = 0;

for (const file of walk(API_REF)) {
  const src = readFileSync(file, "utf8");

  if (src.includes("WhitebitSigner")) {
    skipped++;
    continue;
  }

  const match = src.match(OPENAPI_LINE_RE);
  if (!match) {
    skipped++;
    continue;
  }

  const endpointPath = match[1];
  const newSrc = transformFile(src, endpointPath);

  if (!newSrc) {
    skipped++;
    continue;
  }

  if (DRY_RUN) {
    console.log(`[dry-run] ${relative(ROOT, file)} → path: ${endpointPath}`);
  } else {
    writeFileSync(file, newSrc, "utf8");
    console.log(`updated: ${relative(ROOT, file)}`);
  }
  updated++;
}

console.log(`\nDone. Updated: ${updated}, skipped: ${skipped}`);
if (DRY_RUN) console.log("(dry-run — no files were written)");
