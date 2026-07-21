// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/workers/names).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"account","type":"string","required":true,"description":"Mining pool account name","example":"my_miner_01"},
  {"name":"offset","type":"integer","required":false,"description":"Pagination offset","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Pagination limit","example":"50","default":100},
];
