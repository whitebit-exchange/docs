#!/usr/bin/env node
/**
 * Reads all OpenAPI specs, extracts endpoint examples (payload + response),
 * and POSTs the result to the configured endpoint.
 *
 * Usage: node client.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { load } from './node_modules/js-yaml/dist/js-yaml.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const ENDPOINT = process.env.OPENAPI_SYNC_ENDPOINT ?? 'https://www.www.www';

/** Fields added by WhiteBIT auth — excluded from every payload. */
const AUTH_FIELDS = new Set(['request', 'nonce']);

const SPEC_FILES = [
  'openapi/public/http-v4.yaml',
  'openapi/private/http-trade-v4.yaml',
  'openapi/private/main_api_v4.yaml',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Remove auth fields from a payload object (shallow). */
function stripAuth(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj ?? {};
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !AUTH_FIELDS.has(k))
  );
}

/**
 * Build an example object from schema.properties[*].example values.
 * Skips auth fields when requested.
 */
function exampleFromProperties(schema, skipAuth = false) {
  if (!schema?.properties) return null;
  const obj = {};
  for (const [k, v] of Object.entries(schema.properties)) {
    if (skipAuth && AUTH_FIELDS.has(k)) continue;
    if (v?.example !== undefined) obj[k] = v.example;
  }
  return Object.keys(obj).length ? obj : null;
}

/**
 * Resolve a local $ref string (e.g. '#/components/schemas/Foo') against
 * the spec's components object. Returns the resolved schema or null.
 */
function resolveRef(ref, components) {
  if (!ref?.startsWith('#/components/schemas/') || !components?.schemas) return null;
  const name = ref.slice('#/components/schemas/'.length);
  return components.schemas[name] ?? null;
}

/**
 * Extract one example value from a schema node, following $ref if needed.
 * Returns the example or null if nothing is found.
 */
function exampleFromSchema(schema, components, skipAuth = false) {
  if (!schema) return null;

  // Follow $ref
  if (schema.$ref) {
    schema = resolveRef(schema.$ref, components) ?? schema;
  }

  // Top-level example on the component
  if (schema.example !== undefined) {
    return skipAuth ? stripAuth(schema.example) : schema.example;
  }

  // Build from properties
  return exampleFromProperties(schema, skipAuth);
}

/**
 * Extract a list of examples from an OpenAPI media-type object.
 * Handles: .examples (named), .example (single), schema.$ref, schema.properties (fallback).
 */
function extractMediaExamples(mediaType, components, skipAuth = false) {
  if (!mediaType) return [{}];

  // Named examples  →  { name: { value: {...} } }
  if (mediaType.examples && typeof mediaType.examples === 'object') {
    return Object.values(mediaType.examples).map(ex =>
      skipAuth ? stripAuth(ex?.value ?? {}) : (ex?.value ?? {})
    );
  }

  // Single example on media-type level
  if (mediaType.example !== undefined) {
    return [skipAuth ? stripAuth(mediaType.example) : mediaType.example];
  }

  const schema = mediaType.schema;

  // Array response: items.$ref  →  wrap single resolved example in []
  if (schema?.type === 'array' || schema?.items) {
    const itemSchema = schema.items;
    const item = exampleFromSchema(itemSchema, components, skipAuth);
    return [item !== null ? [item] : []];
  }

  // Object response: resolve $ref or fall back to properties
  const built = exampleFromSchema(schema, components, skipAuth);
  return [built ?? {}];
}

// ─── Core extraction ─────────────────────────────────────────────────────────

/**
 * Returns Array<{ payload, response }> for a single OpenAPI operation.
 * Pairs are zipped by index; shorter list is padded with {}.
 */
function extractPairs(operation, components) {
  const reqMedia =
    operation?.requestBody?.content?.['application/json'] ?? null;
  const respMedia =
    operation?.responses?.['200']?.content?.['application/json'] ??
    operation?.responses?.[200]?.content?.['application/json'] ??
    null;

  const payloads = extractMediaExamples(reqMedia, components, /* skipAuth */ true);
  const responses = extractMediaExamples(respMedia, components, /* skipAuth */ false);

  const len = Math.max(payloads.length, responses.length);
  return Array.from({ length: len }, (_, i) => ({
    payload: payloads[i] ?? {},
    response: responses[i] ?? {},
  }));
}

// ─── Build data ───────────────────────────────────────────────────────────────

const data = {};

for (const relPath of SPEC_FILES) {
  const absPath = join(ROOT, relPath);
  let spec;
  try {
    spec = load(readFileSync(absPath, 'utf8'));
  } catch (err) {
    console.warn(`⚠  Skipping ${relPath}: ${err.message}`);
    continue;
  }

  if (!spec?.paths) continue;

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    // Try all HTTP methods; for GET there will be no requestBody → payload: {}
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      const operation = pathItem[method];
      if (!operation) continue;

      const pairs = extractPairs(operation, spec.components);
      if (!pairs.length) continue;

      if (data[path]) {
        data[path].push(...pairs);
      } else {
        data[path] = pairs;
      }
    }
  }
}

// ─── Send ─────────────────────────────────────────────────────────────────────

async function send() {
  const endpointCount = Object.keys(data).length;
  console.log(`Sending examples for ${endpointCount} endpoints → ${ENDPOINT}`);
  console.log('\n--- Payload ---');
  console.log(JSON.stringify(data, null, 2));
  console.log('--- End of payload ---\n');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await res.text().catch(() => '');

  console.log(`← HTTP ${res.status} ${res.statusText}`);
  if (body) console.log(body);

  if (!res.ok) {
    console.error(`✗ Request failed — pipeline stopped`);
    process.exit(1);
  }

  console.log('✓ Success — continuing pipeline');
}

send().catch(err => {
  console.error(`✗ Network error: ${err.message}`);
  process.exit(1);
});
