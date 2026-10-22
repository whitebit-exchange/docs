// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/convert/estimate).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"from","type":"string","required":true,"description":"From currency. Example: BTC","example":"BTC"},
  {"name":"to","type":"string","required":true,"description":"To currency. Example: USDT","example":"USDT"},
  {"name":"direction","type":"string","required":true,"description":"Convert amount direction, defines in which currency corresponding \"amount\" field is populated. Use \"to\" in case amount is in \"to\" currency, use \"from\" if amount is in \"from\" cur…","example":"to","enum":["from","to"]},
  {"name":"amount","type":"string","required":true,"description":"Amount to convert or receive, sent as a string such as \"35103.1\". Allowed range: 0.00000001 to 100000000000, both inclusive; a value outside the range returns 422 with code 30. …","example":"35103.1"},
];
