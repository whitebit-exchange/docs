// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/workers/hashrate).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"account","type":"string","required":true,"description":"Mining pool account name","example":"my_miner_01"},
  {"name":"worker","type":"string","required":true,"description":"Worker name","example":"worker_001"},
  {"name":"interval","type":"string","required":false,"description":"Time frame granularity","example":"1h","enum":["5m","1h","24h"],"default":"1h"},
  {"name":"from","type":"integer","required":false,"description":"Start timestamp in Unix seconds. Must be <= now","example":"1709290000"},
  {"name":"to","type":"integer","required":false,"description":"End timestamp in Unix seconds. Must be <= now","example":"1709340000"},
];
