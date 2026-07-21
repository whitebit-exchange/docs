// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/hashrate).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"account","type":"string","required":true,"description":"Mining pool account","example":"miner123"},
  {"name":"from","type":"integer","required":false,"description":"Unix timestamp of starting point","example":"1640995200"},
  {"name":"to","type":"integer","required":false,"description":"Unix timestamp of final point","example":"1641081600"},
  {"name":"interval","type":"string","required":false,"description":"Timestamp interval","example":"1h","enum":["5m","1h","24h"],"default":"1h"},
];
