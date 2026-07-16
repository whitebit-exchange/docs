#!/usr/bin/env node
/**
 * Verifies whether Mintlify's served-Markdown surfaces (.md URLs and the docs
 * MCP virtual filesystem) still inline imported component/module source
 * ("export const ..." JS blocks) into page content.
 *
 * Broken today (2026-07-12): every imported module's source is inlined per
 * page — vendor-documented behavior ("all component code on a page, including
 * imported snippets, compiles into the page"; mintlify.com/docs/customize/react-components).
 * llms-full.txt is the clean reference pipeline (0 export blocks).
 *
 * Usage:  node scripts/check-md-export.mjs [--mcp]
 * Exit 0 = clean (fixed), exit 1 = JS still inlined (broken), exit 2 = fetch problem.
 */

const CANARIES = [
  // page path, what it exercises
  ['websocket/rate-limits', 'single component import (RegionBaseUrl)'],
  ['websocket/market-streams/trades', 'snippet component suite + ws-data module'],
  ['api-reference/spot-trading/create-limit-order', 'WhitebitSigner + signer-fields data module'],
];
const BASE = 'https://docs.whitebit.com';

let broken = 0, fetchErrors = 0;

for (const [page, what] of CANARIES) {
  const url = `${BASE}/${page}.md`;
  let body;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    body = await res.text();
  } catch (e) {
    console.log(`FETCH-ERROR  ${url}  ${e.message}`);
    fetchErrors++;
    continue;
  }
  if (body.trimStart().startsWith('<!DOCTYPE')) {
    console.log(`NOT-SERVED   ${url}  (HTML shell — page missing from build)`);
    fetchErrors++;
    continue;
  }
  const exports_ = [...body.matchAll(/^export const ([A-Za-z0-9_]+)/gm)].map(m => m[1]);
  const firstH2 = body.search(/^## /m);
  const total = Buffer.byteLength(body);
  const preamble = firstH2 === -1 ? total : Buffer.byteLength(body.slice(0, firstH2));
  const status = exports_.length ? 'BROKEN' : 'CLEAN ';
  if (exports_.length) broken++;
  console.log(
    `${status}  ${page}  total=${total}B  preamble-before-content=${preamble}B (${Math.round(100 * preamble / total)}%)` +
    (exports_.length ? `  inlined: ${exports_.join(', ')}` : ''),
  );
  console.log(`         (${what})`);
}

if (process.argv.includes('--mcp')) {
  // Same check against the MCP virtual filesystem (what AI clients actually read).
  const rpc = async (payload) => {
    const res = await fetch(`${BASE}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    const line = text.split('\n').find(l => l.startsWith('data: '));
    return JSON.parse(line ? line.slice(6) : text);
  };
  try {
    const r = await rpc({
      jsonrpc: '2.0', id: 1, method: 'tools/call',
      params: { name: 'query_docs_filesystem_white_bit', arguments: { command: 'head -20 /websocket/rate-limits.mdx' } },
    });
    const text = r.result?.content?.[0]?.text ?? '';
    const hasJs = text.includes('export const');
    if (hasJs) broken++;
    console.log(`${hasJs ? 'BROKEN' : 'CLEAN '}  MCP virtual FS /websocket/rate-limits.mdx (head -20 ${hasJs ? 'contains' : 'free of'} export blocks)`);
  } catch (e) {
    console.log(`FETCH-ERROR  MCP probe  ${e.message}`);
    fetchErrors++;
  }
}

console.log(broken ? `\nRESULT: BROKEN — ${broken} surface(s) still inline component/module source.`
                   : fetchErrors ? '\nRESULT: INCONCLUSIVE — fetch problems, no JS detected on reachable surfaces.'
                                 : '\nRESULT: CLEAN — no inlined module source detected.');
process.exit(broken ? 1 : fetchErrors ? 2 : 0);
