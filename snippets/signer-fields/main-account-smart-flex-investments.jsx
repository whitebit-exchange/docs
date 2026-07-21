// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/smart-flex/investments).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"limit","type":"integer","required":false,"description":"Pagination limit. Default: 100.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Pagination offset. Default: 0.","example":"0","default":0},
  {"name":"ticker","type":"string","required":false,"description":"Filter by currency ticker. Example: USDT.","example":"USDT"},
  {"name":"plan","type":"string","required":false,"description":"Filter by plan ID (UUID).","example":"8f2e9d3c-1a4b-4c2d-9e5f-6a7b8c9d0e1f"},
  {"name":"investment","type":"string","required":false,"description":"Filter by investment ID.","example":"inv_7e2d9c3b-1a4b-4c2d-9e5f-6a7b8c9d0e1f"},
  {"name":"investmentStatus","type":"integer","required":false,"description":"Filter by status (1=ACTIVE, 0=CLOSED).","example":"1","enum":["0","1"]},
];
