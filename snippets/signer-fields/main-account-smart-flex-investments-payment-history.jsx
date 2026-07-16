// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/smart-flex/investments/payment-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"limit","type":"integer","required":false,"description":"Pagination limit.","example":"50","default":50},
  {"name":"offset","type":"integer","required":false,"description":"Pagination offset.","example":"0","default":0},
  {"name":"plan","type":"string","required":false,"description":"Filter by plan ID (UUID).","example":"8f2e9d3c-1a4b-4c2d-9e5f-6a7b8c9d0e1f"},
  {"name":"investment","type":"string","required":false,"description":"Filter by investment ID.","example":"inv_7e2d9c3b-1a4b-4c2d-9e5f-6a7b8c9d0e1f"},
  {"name":"transaction","type":"string","required":false,"description":"Filter by transaction ID.","example":"tx_9f3e0d4c-2b5c-4d3e-8f6g-7a8b9c0d1e2f"},
  {"name":"dateFrom","type":"integer","required":false,"description":"Filter from date (timestamp).","example":"1640995200"},
  {"name":"dateTo","type":"integer","required":false,"description":"Filter to date (timestamp).","example":"1641081600"},
];
