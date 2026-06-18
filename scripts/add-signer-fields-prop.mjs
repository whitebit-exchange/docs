#!/usr/bin/env node
/**
 * Adds `fields={SIGNER_FIELDS["..."]}` prop and the SIGNER_FIELDS import
 * to every private API MDX page that already has <WhitebitSigner>.
 *
 * Usage: node scripts/add-signer-fields-prop.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const API_REF = join(ROOT, "api-reference");
const DRY_RUN = process.argv.includes("--dry-run");

const FIELDS_IMPORT = `import { SIGNER_FIELDS } from '/snippets/signer-fields-data.jsx';`;

// Regex to find <WhitebitSigner path="..." /> and add fields prop
// Handles single-line self-closing tags with or without existing props
const SIGNER_TAG_RE = /<WhitebitSigner\s+path="([^"]+)"(\s*\/?>)/;

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

let updated = 0;
let skipped = 0;

for (const file of walk(API_REF)) {
  const src = readFileSync(file, "utf8");

  // Only process pages that have WhitebitSigner
  if (!src.includes("WhitebitSigner")) {
    skipped++;
    continue;
  }

  // Skip if already updated
  if (src.includes("SIGNER_FIELDS")) {
    skipped++;
    continue;
  }

  // Find the endpoint path from the WhitebitSigner tag
  const match = src.match(SIGNER_TAG_RE);
  if (!match) {
    skipped++;
    continue;
  }

  const endpointPath = match[1];

  // 1. Add SIGNER_FIELDS import after the WhitebitSigner import line
  let newSrc = src.replace(
    `import { WhitebitSigner } from '/components/WhitebitSigner.jsx';`,
    `import { WhitebitSigner } from '/components/WhitebitSigner.jsx';\n${FIELDS_IMPORT}`,
  );

  // 2. Add fields prop to the <WhitebitSigner> tag
  newSrc = newSrc.replace(
    SIGNER_TAG_RE,
    `<WhitebitSigner path="${endpointPath}" fields={SIGNER_FIELDS["${endpointPath}"]}$2`,
  );

  if (newSrc === src) {
    skipped++;
    continue;
  }

  if (DRY_RUN) {
    console.log(`[dry-run] ${relative(ROOT, file)}`);
  } else {
    writeFileSync(file, newSrc, "utf8");
    console.log(`updated: ${relative(ROOT, file)}`);
  }
  updated++;
}

console.log(`\nDone. Updated: ${updated}, skipped: ${skipped}`);
if (DRY_RUN) console.log("(dry-run — no files written)");
