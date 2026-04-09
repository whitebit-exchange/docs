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

/**
 * Extract tuple-style fields from a schema that has indexed `items` with `x-field-name`.
 * Returns null if the schema is not a qualifying tuple schema.
 */
function tupleToFields(schema, allSchemas) {
  if (!schema || typeof schema !== 'object') return null;

  // Resolve top-level $ref
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop();
    return tupleToFields(allSchemas[name], allSchemas);
  }

  // Check: must be an array type with indexed items array
  if (schema.type !== 'array' || !Array.isArray(schema.items)) return null;

  // At least one item must have x-field-name
  if (!schema.items.some((item) => item?.['x-field-name'])) return null;

  return schema.items.map((item, index) => {
    // Preserve x-* annotations from the original item before resolving $ref
    const originalFieldName = item?.['x-field-name'];
    const originalExample = item?.['x-example'];
    const originalRequired = item?.['x-required'];
    const originalEnumLabels = item?.['x-enum-labels'];

    // Resolve $ref on individual item
    let it = item;
    if (it?.$ref) {
      const refName = it.$ref.split('/').pop();
      it = allSchemas[refName] || it;
    }

    const field = {
      index,
      field: originalFieldName || it['x-field-name'] || `[${index}]`,
      type: it.type || (it.properties ? 'object' : 'any'),
      description: stripLinks(it.description || ''),
    };

    const example = originalExample !== undefined ? originalExample : it['x-example'];
    if (example !== undefined) {
      field.example = String(example);
    }

    if (Array.isArray(it.enum) && it.enum.length > 0) {
      field.enum = it.enum;
    }

    const required = originalRequired !== undefined ? originalRequired : it['x-required'];
    if (required !== undefined) {
      field.required = Boolean(required);
    }

    const enumLabels = originalEnumLabels || it['x-enum-labels'];
    if (enumLabels && typeof enumLabels === 'object') {
      field.enumLabels = enumLabels;
    }

    return field;
  });
}

/**
 * Serialise a tuple fields array to a compact JS literal.
 */
function tupleFieldsToJs(fields) {
  const lines = fields.map((f) => {
    const parts = [`index: ${f.index}`, `field: ${JSON.stringify(f.field)}`, `type: ${JSON.stringify(f.type)}`];
    parts.push(`description: ${JSON.stringify(f.description)}`);
    if (f.required !== undefined) parts.push(`required: ${f.required}`);
    if (f.example !== undefined) parts.push(`example: ${JSON.stringify(f.example)}`);
    if (f.enum) parts.push(`enum: ${JSON.stringify(f.enum)}`);
    if (f.enumLabels) parts.push(`enumLabels: ${JSON.stringify(f.enumLabels)}`);
    return `  { ${parts.join(', ')} },`;
  });
  return `[\n${lines.join('\n')}\n]`;
}

/**
 * Derive WsChannelOverview operations array from AsyncAPI operations + messages.
 * Returns null if no standard operations are found.
 */
function deriveChannelOperations(operations, messages, schemas, allSchemas) {
  if (!operations || Object.keys(operations).length === 0) return null;

  const ops = Object.entries(operations);
  const result = [];

  // Helper: resolve method const from a message's payload schema (handles allOf)
  function getMethodConst(msgKey) {
    const msg = messages?.[msgKey];
    if (!msg) return null;
    let payloadSchema = msg.payload;
    if (payloadSchema?.$ref) {
      const name = payloadSchema.$ref.split('/').pop();
      payloadSchema = schemas[name];
    }
    // Direct properties
    if (payloadSchema?.properties?.method?.const) {
      return payloadSchema.properties.method.const;
    }
    // Handle allOf composition (e.g., service.yaml PingRequest)
    if (payloadSchema?.allOf) {
      for (const part of payloadSchema.allOf) {
        let resolved = part;
        if (part.$ref) {
          const refName = part.$ref.split('/').pop();
          resolved = schemas[refName] || part;
        }
        if (resolved?.properties?.method?.const) {
          return resolved.properties.method.const;
        }
      }
    }
    return null;
  }

  const consumed = new Set(); // track consumed operation names

  // Detect Query operations: send*Request paired with receive*Response
  for (const [opName, op] of ops) {
    const reqMatch = opName.match(/^send(\w+)Request$/);
    if (!reqMatch) continue;
    const stem = reqMatch[1];

    // Find the matching response
    const respOp = ops.find(([n]) => n === `receive${stem}Response`);
    if (!respOp) continue;

    consumed.add(opName);
    consumed.add(respOp[0]);

    // Get message keys from channel refs
    const reqMsgRef = op.messages?.[0]?.$ref;
    const respMsgRef = respOp[1].messages?.[0]?.$ref;
    const reqMsgKey = reqMsgRef?.split('/').pop();
    const respMsgKey = respMsgRef?.split('/').pop();

    const sendMethod = getMethodConst(reqMsgKey);
    const respSummary = messages?.[respMsgKey]?.summary || 'Response';

    // Use "Query" unless the spec has no subscribe ops (service-style: use message title)
    const hasSubscribe = ops.some(([n]) => /^send\w+Subscribe$/.test(n));
    const queryName = hasSubscribe ? 'Query' : (messages?.[reqMsgKey]?.title || 'Query');

    result.push({
      name: queryName,
      send: sendMethod || reqMsgKey,
      receive: respSummary,
      push: null,
    });
  }

  // Detect Subscribe operations
  for (const [opName, op] of ops) {
    const subMatch = opName.match(/^send(\w+)Subscribe$/);
    if (!subMatch) continue;
    const stem = subMatch[1];

    consumed.add(opName);

    const subMsgRef = op.messages?.[0]?.$ref;
    const subMsgKey = subMsgRef?.split('/').pop();
    const sendMethod = getMethodConst(subMsgKey);

    // Mark related operations as consumed
    const subResp = ops.find(([n]) => n === `receive${stem}SubscribeResponse`);
    if (subResp) consumed.add(subResp[0]);

    // Find the update operation and message
    const updateOp = ops.find(([n]) => n === `receive${stem}Updates`);
    let pushText = null;
    if (updateOp) {
      consumed.add(updateOp[0]);
      const updateMsgRef = updateOp[1].messages?.[0]?.$ref;
      const updateMsgKey = updateMsgRef?.split('/').pop();
      const updateMethod = getMethodConst(updateMsgKey);
      const rawSummary = messages?.[updateMsgKey]?.summary || updateOp[1].description || '';
      // Lowercase first letter of summary after " — " to match editorial style
      const updateSummary = rawSummary ? rawSummary.charAt(0).toLowerCase() + rawSummary.slice(1) : '';
      if (updateMethod) {
        pushText = updateSummary ? `${updateMethod} — ${updateSummary}` : updateMethod;
      }
    }

    result.push({
      name: 'Subscribe',
      send: sendMethod || subMsgKey,
      receive: 'Confirmation (status: success)',
      push: pushText,
    });
  }

  // Detect Unsubscribe operations
  for (const [opName, op] of ops) {
    const unsubMatch = opName.match(/^send(\w+)Unsubscribe$/);
    if (!unsubMatch) continue;

    consumed.add(opName);
    // Mark unsubscribe response as consumed if present
    const unsubResp = ops.find(([n]) => n.startsWith('receive') && n.endsWith('UnsubscribeResponse'));
    if (unsubResp) consumed.add(unsubResp[0]);

    const unsubMsgRef = op.messages?.[0]?.$ref;
    const unsubMsgKey = unsubMsgRef?.split('/').pop();
    const sendMethod = getMethodConst(unsubMsgKey);

    result.push({
      name: 'Unsubscribe',
      send: sendMethod || unsubMsgKey,
      receive: 'Confirmation (status: success)',
      push: null,
    });
  }

  // Handle remaining unmatched operations (e.g., service ping/time, authorize)
  for (const [opName, op] of ops) {
    if (consumed.has(opName)) continue;
    if (op.action !== 'receive') continue; // server-perspective: receive = client sends

    consumed.add(opName);

    const msgRef = op.messages?.[0]?.$ref;
    const msgKey = msgRef?.split('/').pop();
    const msg = messages?.[msgKey];
    const sendMethod = getMethodConst(msgKey);

    // Find a matching response among unconsumed send operations
    const stem = opName.replace(/^send/, '');
    const respOp = ops.find(([n, o]) => !consumed.has(n) && o.action === 'send' && n.toLowerCase().includes(stem.toLowerCase()));
    let receiveSummary = 'Response';
    if (respOp) {
      consumed.add(respOp[0]);
      const respMsgRef = respOp[1].messages?.[0]?.$ref;
      const respMsgKey = respMsgRef?.split('/').pop();
      receiveSummary = messages?.[respMsgKey]?.summary || 'Response';
    }

    result.push({
      name: msg?.title || stem,
      send: sendMethod || msgKey,
      receive: receiveSummary,
      push: null,
    });
  }

  return result.length > 0 ? result : null;
}

/**
 * Serialise a channelOperations array to JS literal.
 */
function channelOpsToJs(ops) {
  const lines = ops.map((o) => {
    const parts = [
      `name: ${JSON.stringify(o.name)}`,
      `send: ${JSON.stringify(o.send)}`,
      `receive: ${JSON.stringify(o.receive)}`,
      `push: ${o.push ? JSON.stringify(o.push) : 'null'}`,
    ];
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
    const operations = spec?.operations || {};

    // Schema field exports — feed <WsSchemaTable>
    const schemaExports = [];
    for (const [schemaName, schema] of Object.entries(schemas)) {
      const fields = schemaToFields(schema, schemas);
      if (!fields || fields.length === 0) continue;
      schemaExports.push(`export const ${toCamel(schemaName)} = ${fieldsToJs(fields)};`);
    }

    // Tuple field exports — feed <WsTupleTable>
    const tupleExports = [];
    for (const [schemaName, schema] of Object.entries(schemas)) {
      // Top-level tuple schemas (e.g., Candle)
      const tupleFields = tupleToFields(schema, schemas);
      if (tupleFields) {
        tupleExports.push(`export const ${toCamel(schemaName)}TupleFields = ${tupleFieldsToJs(tupleFields)};`);
      }

      // Nested params tuple (e.g., DealsUpdate.params)
      if (schema?.properties?.params) {
        const paramsTuple = tupleToFields(schema.properties.params, schemas);
        if (paramsTuple) {
          tupleExports.push(`export const ${toCamel(schemaName)}ParamsTupleFields = ${tupleFieldsToJs(paramsTuple)};`);
        }
      }
    }

    // Channel operations export — feed <WsChannelOverview>
    const channelOps = deriveChannelOperations(operations, messages, schemas, schemas);
    const channelOpsExport = channelOps
      ? `export const channelOperations = ${channelOpsToJs(channelOps)};`
      : null;

    // Message example exports — feed <WsMessageExample>
    const exampleExports = messageExamplesToExports(messages);

    // Channel metadata export — feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
    const authRequired = spec?.info?.['x-auth-required'];
    const rateLimits = spec?.info?.['x-rate-limits'];
    const errorCodes = spec?.info?.['x-error-codes'];
    let metaExport = null;
    if (authRequired !== undefined || rateLimits || errorCodes !== undefined) {
      const meta = {};
      if (authRequired !== undefined) meta.authRequired = Boolean(authRequired);
      if (rateLimits) {
        meta.rateLimits = {
          connectionsPerMinute: rateLimits['connections-per-minute'] || 1000,
          requestsPerMinute: rateLimits['requests-per-minute'] || 200,
        };
      }
      meta.errorCodes = errorCodes || 'standard';
      metaExport = `export const channelMeta = ${JSON.stringify(meta, null, 2)};`;
    }

    const allExports = [...schemaExports, ...tupleExports, ...(channelOpsExport ? [channelOpsExport] : []), ...(metaExport ? [metaExport] : []), ...exampleExports];

    if (allExports.length === 0) {
      console.log(`  –  ${dir}/${file}: no schemas or examples found, skipping`);
      continue;
    }

    const firstExportedSchemaName = schemaExports[0]?.match(/^export const (\w+)/)?.[1];
    const firstExampleName = exampleExports[0]?.match(/^export const (\w+)/)?.[1];
    const importParts = [firstExportedSchemaName, ...(metaExport ? ['channelMeta'] : []), firstExampleName].filter(Boolean);
    const header = [
      `// AUTO-GENERATED — do not edit manually.`,
      `// Source: ${dir}/${file}`,
      `// Regenerate: node scripts/generate-ws-data.mjs`,
      `//`,
      `// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />`,
      `// Example exports (ex prefix) → feed <WsMessageExample data={...} />`,
      `// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>`,
      ...(importParts.length > 0 ? [`//   import { ${importParts.join(', ')} } from '/snippets/ws-data/${specName}.jsx'`] : []),
    ].join('\n');

    const sections = [];
    if (schemaExports.length > 0) {
      sections.push(`// ── Schema field arrays ─────────────────────────────────────────────────────\n\n${schemaExports.join('\n\n')}`);
    }
    if (tupleExports.length > 0) {
      sections.push(`// ── Tuple field arrays ──────────────────────────────────────────────────────\n\n${tupleExports.join('\n\n')}`);
    }
    if (channelOpsExport) {
      sections.push(`// ── Channel operations ──────────────────────────────────────────────────────\n\n${channelOpsExport}`);
    }
    if (metaExport) {
      sections.push(`// ── Channel metadata ────────────────────────────────────────────────────────\n\n${metaExport}`);
    }
    if (exampleExports.length > 0) {
      sections.push(`// ── Message examples ────────────────────────────────────────────────────────\n\n${exampleExports.join('\n\n')}`);
    }

    writeFileSync(outPath, `${header}\n\n${sections.join('\n\n')}\n`);
    const parts = [`${schemaExports.length} schema${schemaExports.length !== 1 ? 's' : ''}`];
    if (tupleExports.length > 0) parts.push(`${tupleExports.length} tuple${tupleExports.length !== 1 ? 's' : ''}`);
    if (channelOpsExport) parts.push('ops');
    if (metaExport) parts.push('meta');
    parts.push(`${exampleExports.length} example${exampleExports.length !== 1 ? 's' : ''}`);
    console.log(`  ✓  ${outPath.replace(ROOT + '/', '')} (${parts.join(', ')})`);
    totalFiles++;
  }
}

console.log(`\nDone — generated ${totalFiles} data file${totalFiles !== 1 ? 's' : ''} in snippets/ws-data/`);
