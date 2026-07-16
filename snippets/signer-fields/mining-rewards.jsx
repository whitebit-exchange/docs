// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/rewards).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"account","type":"string","required":false,"description":"Mining pool account","example":"miner123"},
  {"name":"from","type":"integer","required":false,"description":"Date timestamp starting from which rewards are received","example":"1640995200"},
  {"name":"to","type":"integer","required":false,"description":"Date timestamp until which rewards are received","example":"1641081600"},
  {"name":"limit","type":"integer","required":false,"example":"30","default":30},
  {"name":"offset","type":"integer","required":false,"example":"0","default":0},
];
