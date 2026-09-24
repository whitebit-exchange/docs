// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/refund-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"depositId","type":"string","required":false,"description":"Deposit transaction UUID. Returns refunds for this deposit only.","example":"8f2b0a2e-1c4e-4a2f-9a1d-6f1f4a0d7e31"},
  {"name":"ticker","type":"string","required":false,"description":"Currency ticker. Exact match, case-insensitive. Matches the currency on every network — for example, USDT returns refunds of USDT deposits on all networks. The network of each r…","example":"BTC"},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip.","example":"0","default":0},
];
