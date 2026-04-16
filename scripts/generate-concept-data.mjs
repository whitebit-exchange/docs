#!/usr/bin/env node
/**
 * generate-concept-data.mjs
 *
 * Reads YAML data files from data/ and writes JS data modules into
 * snippets/concept-data/. These modules export arrays and objects that
 * feed <ConceptTable /> and other presentational components.
 *
 * The data/*.yaml files are the single source of truth for cross-cutting
 * contract data (rate limits, error codes, authentication headers).
 * Both concepts/*.mdx and api-reference/*.mdx pages import from the
 * same generated modules — eliminating duplication and contradictions.
 *
 * Usage:
 *   node scripts/generate-concept-data.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const OUT_DIR = join(ROOT, 'snippets/concept-data');

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Serialise a value to a compact JS literal string.
 * Handles arrays of objects, plain objects, and primitives.
 */
function toJsLiteral(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return `${innerPad}${objectToInlineLiteral(item)}`;
      }
      return `${innerPad}${JSON.stringify(item)}`;
    });
    return `[\n${items.join(',\n')},\n${pad}]`;
  }

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value).map(([k, v]) => {
      const val = typeof v === 'object' && v !== null
        ? toJsLiteral(v, indent + 1)
        : JSON.stringify(v);
      return `${innerPad}${safeKey(k)}: ${val}`;
    });
    return `{\n${entries.join(',\n')},\n${pad}}`;
  }

  return JSON.stringify(value);
}

/**
 * Render a flat object as a single-line JS literal.
 * For nested values, falls back to JSON.stringify.
 */
function objectToInlineLiteral(obj) {
  const parts = Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'object' && v !== null) {
      return `${safeKey(k)}: ${JSON.stringify(v)}`;
    }
    return `${safeKey(k)}: ${JSON.stringify(v)}`;
  });
  return `{ ${parts.join(', ')} }`;
}

/**
 * Return a safe JS object key — unquoted if it's a valid identifier,
 * otherwise JSON-quoted.
 */
function safeKey(key) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

// ── Main ───────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

let files;
try {
  files = readdirSync(DATA_DIR).filter((f) => extname(f) === '.yaml');
} catch {
  console.warn('  ⚠  Data directory not found: data/');
  console.log('\nDone — generated 0 data files in snippets/concept-data/');
  process.exit(0);
}

if (files.length === 0) {
  console.warn('  ⚠  No .yaml files found in data/');
  console.log('\nDone — generated 0 data files in snippets/concept-data/');
  process.exit(0);
}

let totalFiles = 0;

for (const file of files) {
  const specPath = join(DATA_DIR, file);
  const specName = basename(file, '.yaml');
  const outPath = join(OUT_DIR, `${specName}.jsx`);

  let data;
  try {
    data = parse(readFileSync(specPath, 'utf8'));
  } catch (err) {
    console.error(`  ✗  Failed to parse ${specPath}: ${err.message}`);
    continue;
  }

  if (!data || typeof data !== 'object') {
    console.log(`  –  data/${file}: no exportable data, skipping`);
    continue;
  }

  // Generate one named export per top-level key
  const exports = [];
  const exportNames = [];
  const VALID_IDENT = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

  for (const [key, value] of Object.entries(data)) {
    // Skip YAML comments-only keys
    if (value == null) continue;
    if (!VALID_IDENT.test(key)) {
      console.error(`  ✗  data/${file}: key "${key}" is not a valid JS identifier, skipping`);
      continue;
    }
    exports.push(`export const ${key} = ${toJsLiteral(value)};`);
    exportNames.push(key);
  }

  if (exports.length === 0) {
    console.log(`  –  data/${file}: no exportable data, skipping`);
    continue;
  }

  const header = [
    `// AUTO-GENERATED — do not edit manually.`,
    `// Source: data/${file}`,
    `// Regenerate: node scripts/generate-concept-data.mjs`,
    `//`,
    `//   import { ${exportNames.slice(0, 3).join(', ')}${exportNames.length > 3 ? ', ...' : ''} } from '/snippets/concept-data/${specName}.jsx'`,
  ].join('\n');

  writeFileSync(outPath, `${header}\n\n${exports.join('\n\n')}\n`);
  console.log(`  ✓  snippets/concept-data/${specName}.jsx (${exportNames.length} export${exportNames.length !== 1 ? 's' : ''}: ${exportNames.join(', ')})`);
  totalFiles++;
}

console.log(`\nDone — generated ${totalFiles} data file${totalFiles !== 1 ? 's' : ''} in snippets/concept-data/`);
