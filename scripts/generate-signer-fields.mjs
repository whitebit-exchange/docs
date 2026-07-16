#!/usr/bin/env node
/**
 * Generates one snippets/signer-fields/<slug>.jsx per private POST endpoint.
 * Collects both requestBody fields (paramIn omitted → body) and query/path
 * parameters (paramIn: "query" | "path") for every POST endpoint.
 * Per-endpoint files keep each page's served-Markdown export free of the
 * other endpoints' field data (Mintlify inlines every imported module).
 *
 * Re-run after editing any openapi/private/*.yaml request body or parameter schema.
 * Usage: node scripts/generate-signer-fields.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SPECS = [
  'openapi/private/http-trade-v4.yaml',
  'openapi/private/main_api_v4.yaml',
  'openapi/private/address-checker.yaml',
];

const OUT_DIR = join(ROOT, 'snippets/signer-fields');

// /api/v4/order/new → order-new; /api/card-token → api-card-token
export function endpointSlug(path) {
  return path
    .replace(/^\/api\/v4\//, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fields auto-added by WhitebitSigner.compute() — never shown in the UI
const SKIP = new Set(['request', 'nonce', 'nonceWindow']);

const stripMd = (s) =>
  (s || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function resolveRef(ref, components) {
  const name = ref.replace(/^#\/components\/schemas\//, '');
  return components?.schemas?.[name];
}

function flattenSchema(schema, components, depth = 0) {
  if (!schema || depth > 6) return null;
  if (schema.$ref) {
    return flattenSchema(resolveRef(schema.$ref, components), components, depth + 1);
  }
  if (schema.allOf) {
    return schema.allOf.reduce((acc, s) => {
      const r = flattenSchema(s, components, depth + 1);
      if (!r) return acc;
      return {
        type: 'object',
        required: [...(acc.required || []), ...(r.required || [])],
        properties: { ...(acc.properties || {}), ...(r.properties || {}) },
      };
    }, {});
  }
  return schema;
}

function schemaToBodyFields(schema, components) {
  const flat = flattenSchema(schema, components);
  if (!flat?.properties) return [];

  const required = new Set(flat.required || []);

  return Object.entries(flat.properties)
    .filter(([name]) => !SKIP.has(name))
    .map(([name, raw]) => {
      let p = raw?.$ref ? (resolveRef(raw.$ref, components) || raw) : raw;
      const type = p.type || (p.properties ? 'object' : p.items ? 'array' : 'string');
      const f = { name, type, required: required.has(name) };
      if (p.description) {
        const d = stripMd(p.description);
        if (d) f.description = d.length > 180 ? d.slice(0, 177) + '…' : d;
      }
      if (p.example !== undefined && p.example !== '{{request}}' && p.example !== '{{nonce}}') {
        f.example = String(p.example);
      }
      if (Array.isArray(p.enum) && p.enum.length > 0) f.enum = p.enum.map(String);
      if (p.default !== undefined) f.default = p.default;
      if (p.nullable) f.nullable = true;
      return f;
    });
}

function opToQueryFields(op) {
  if (!op.parameters) return [];
  return op.parameters
    .filter(p => p.in === 'query' || p.in === 'path')
    .map(param => {
      const p = param.schema || {};
      const type = p.type || 'string';
      const f = {
        name: param.name,
        type,
        required: !!param.required,
        paramIn: param.in,
      };
      const rawDesc = param.description || p.description;
      if (rawDesc) {
        const d = stripMd(rawDesc);
        if (d) f.description = d.length > 180 ? d.slice(0, 177) + '…' : d;
      }
      const ex = p.example ?? param.example;
      if (ex !== undefined) f.example = String(ex);
      if (Array.isArray(p.enum) && p.enum.length > 0) f.enum = p.enum.map(String);
      if (p.default !== undefined) f.default = p.default;
      return f;
    });
}

function main() {
  const result = {};

  for (const rel of SPECS) {
    const spec = parse(readFileSync(join(ROOT, rel), 'utf8'));
    const { components, paths = {} } = spec;

    for (const [path, pathItem] of Object.entries(paths)) {
      for (const [method, op] of Object.entries(pathItem)) {
        if (method !== 'post') continue;

        const queryFields = opToQueryFields(op);

        const schema = op.requestBody?.content?.['application/json']?.schema;
        const bodyFields = schema ? schemaToBodyFields(schema, components) : [];

        // Query params first, then body params
        const fields = [...queryFields, ...bodyFields];

        // Always emit the path (even empty) so the component shows structured mode
        result[path] = fields;
      }
    }
  }

  // ── Write snippets/signer-fields/<slug>.jsx (one file per endpoint) ────────

  const slugToPath = new Map();
  for (const path of Object.keys(result)) {
    const slug = endpointSlug(path);
    if (slugToPath.has(slug)) {
      console.error(
        `Slug collision: "${slug}" maps to both ${slugToPath.get(slug)} and ${path}`,
      );
      process.exit(1);
    }
    slugToPath.set(slug, path);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  for (const [path, fields] of Object.entries(result)) {
    const lines = [
      '// AUTO-GENERATED — do not edit manually.',
      `// Source: openapi/private/*.yaml (requestBody + query/path parameters of ${path}).`,
      '// Regenerate: node scripts/generate-signer-fields.mjs',
      '',
      'export const signerFields = [',
      ...fields.map((f) => `  ${JSON.stringify(f)},`),
      '];',
      '',
    ];
    writeFileSync(join(OUT_DIR, `${endpointSlug(path)}.jsx`), lines.join('\n'));
  }

  console.log(
    `Generated ${Object.keys(result).length} endpoint files → snippets/signer-fields/`,
  );
}

// Run generation only when executed directly, so endpointSlug is importable
// (e.g. by scripts/add-signer-fields-prop.mjs) without side effects.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
