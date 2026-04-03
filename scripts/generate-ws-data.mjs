#!/usr/bin/env node
/**
 * generate-ws-data.mjs
 *
 * Reads every AsyncAPI YAML spec in asyncapi/private/ and asyncapi/public/,
 * extracts schema definitions and message examples, and writes JS data modules
 * into snippets/ws-data/.
 *
 * Exports two kinds of data:
 *   - Schema field arrays  (camelCase schema name) — feed <WsSchemaTable>
 *   - Message examples     (ex + PascalCase name)  — feed <WsMessageExample>
 *
 * The AsyncAPI YAML is the single source of truth. Re-run whenever any
 * asyncapi/*.yaml schema or examples section is updated.
 *
 * Usage:
 *   node scripts/generate-ws-data.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPEC_DIRS = ['asyncapi/private', 'asyncapi/public'];
const OUT_DIR = join(ROOT, 'snippets/ws-data');

// ── Helpers ────────────────────────────────────────────────────────────────

/** Strip markdown link syntax: [text](url) → text */
const stripLinks = (s) => (s || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();

/** PascalCase → camelCase for export names */
const toCamel = (s) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * Convert an AsyncAPI/JSON-Schema object schema to a WsSchemaTable fields array.
 * Skips schemas with no `properties` (scalars, arrays, etc.).
 */
function schemaToFields(schema, allSchemas) {
  if (!schema || typeof schema !== 'object') return null;

  // Resolve top-level $ref
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop();
    return schemaToFields(allSchemas[name], allSchemas);
  }

  if (!schema.properties) return null;

  const required = new Set(schema.required || []);

  return Object.entries(schema.properties).map(([name, prop]) => {
    // Resolve $ref on individual property
    let p = prop;
    if (p.$ref) {
      const refName = p.$ref.split('/').pop();
      p = allSchemas[refName] || p;
    }

    // Handle tuple-style `items` arrays (AsyncAPI 3 pattern)
    if (!p.type && Array.isArray(p.items)) {
      p = { ...p, type: 'array' };
    }

    const field = {
      name,
      type: p.type || (p.properties ? 'object' : 'any'),
      description: (() => {
        let d = stripLinks(p.description || '');
        // Add const value only if the description doesn't already mention it
        if (p.const !== undefined && !d.includes(String(p.const))) {
          const constStr = `Fixed value: "${p.const}".`;
          d = d ? `${d} ${constStr}` : constStr;
        }
        return d;
      })(),
    };

    if (required.has(name)) field.required = true;

    if (Array.isArray(p.enum) && p.enum.length > 0) {
      field.enum = p.enum;
    }

    return field;
  });
}

/**
 * Serialise a fields array to a compact JS literal, one field per line.
 * Values containing double-quotes are escaped.
 */
function fieldsToJs(fields) {
  const lines = fields.map((f) => {
    const parts = [`name: ${JSON.stringify(f.name)}`, `type: ${JSON.stringify(f.type)}`];
    if (f.required) parts.push('required: true');
    if (f.enum) parts.push(`enum: ${JSON.stringify(f.enum)}`);
    parts.push(`description: ${JSON.stringify(f.description)}`);
    return `  { ${parts.join(', ')} },`;
  });
  return `[\n${lines.join('\n')}\n]`;
}

/** Prefix a PascalCase name for message example exports: "OrdersPendingRequest" → "exOrdersPendingRequest" */
const toExName = (s) => 'ex' + s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Extract message example exports from components.messages.
 * Single-example messages → exMessageName.
 * Multi-example messages → exExampleName (using the YAML example's own `name` field).
 */
function messageExamplesToExports(messages) {
  const exports = [];
  for (const [msgName, msg] of Object.entries(messages)) {
    const examples = msg?.examples;
    if (!examples || examples.length === 0) continue;

    if (examples.length === 1) {
      const payload = examples[0]?.payload;
      if (payload == null) continue;
      exports.push(`export const ${toExName(msgName)} = ${JSON.stringify(payload, null, 2)};`);
    } else {
      for (const ex of examples) {
        if (ex?.payload == null || !ex.name) continue;
        exports.push(`export const ${toExName(ex.name)} = ${JSON.stringify(ex.payload, null, 2)};`);
      }
    }
  }
  return exports;
}

// ── Main ───────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true });

let totalFiles = 0;

for (const dir of SPEC_DIRS) {
  const absDir = join(ROOT, dir);
  let files;
  try {
    files = readdirSync(absDir).filter((f) => extname(f) === '.yaml');
  } catch {
    console.warn(`  ⚠  Directory not found: ${dir}`);
    continue;
  }

  for (const file of files) {
    const specPath = join(absDir, file);
    const specName = basename(file, '.yaml');          // e.g. "orders_pending"
    const outPath = join(OUT_DIR, `${specName}.jsx`);  // snippets/ws-data/orders_pending.jsx

    let spec;
    try {
      spec = parse(readFileSync(specPath, 'utf8'));
    } catch (err) {
      console.error(`  ✗  Failed to parse ${specPath}: ${err.message}`);
      continue;
    }

    const schemas = spec?.components?.schemas || {};
    const messages = spec?.components?.messages || {};

    // Schema field exports — feed <WsSchemaTable>
    const schemaExports = [];
    for (const [schemaName, schema] of Object.entries(schemas)) {
      const fields = schemaToFields(schema, schemas);
      if (!fields || fields.length === 0) continue;
      schemaExports.push(`export const ${toCamel(schemaName)} = ${fieldsToJs(fields)};`);
    }

    // Message example exports — feed <WsMessageExample>
    const exampleExports = messageExamplesToExports(messages);

    const allExports = [...schemaExports, ...exampleExports];

    if (allExports.length === 0) {
      console.log(`  –  ${dir}/${file}: no schemas or examples found, skipping`);
      continue;
    }

    const firstSchemaName = Object.keys(schemas)[0];
    const header = [
      `// AUTO-GENERATED — do not edit manually.`,
      `// Source: ${dir}/${file}`,
      `// Regenerate: node scripts/generate-ws-data.mjs`,
      `//`,
      `// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />`,
      `// Example exports (ex prefix) → feed <WsMessageExample data={...} />`,
      ...(firstSchemaName ? [`//   import { ${toCamel(firstSchemaName)}, exOrdersPendingRequest } from '/snippets/ws-data/${specName}.jsx'`] : []),
    ].join('\n');

    const sections = [];
    if (schemaExports.length > 0) {
      sections.push(`// ── Schema field arrays ─────────────────────────────────────────────────────\n\n${schemaExports.join('\n\n')}`);
    }
    if (exampleExports.length > 0) {
      sections.push(`// ── Message examples ────────────────────────────────────────────────────────\n\n${exampleExports.join('\n\n')}`);
    }

    writeFileSync(outPath, `${header}\n\n${sections.join('\n\n')}\n`);
    console.log(`  ✓  ${outPath.replace(ROOT + '/', '')} (${schemaExports.length} schema${schemaExports.length !== 1 ? 's' : ''}, ${exampleExports.length} example${exampleExports.length !== 1 ? 's' : ''})`);
    totalFiles++;
  }
}

console.log(`\nDone — generated ${totalFiles} data file${totalFiles !== 1 ? 's' : ''} in snippets/ws-data/`);
