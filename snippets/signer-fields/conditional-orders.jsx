// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/conditional-orders).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Filter by specific market. Example: BTC_USDT If not specified, returns conditional orders for all markets.","example":"BTC_USDT"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip for pagination.","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return per page.","example":"100","default":50},
];
