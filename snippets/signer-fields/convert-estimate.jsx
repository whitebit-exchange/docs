// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/convert/estimate).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"from","type":"string","required":true,"description":"From currency. Example: BTC","example":"BTC"},
  {"name":"to","type":"string","required":true,"description":"To currency. Example: USDT","example":"USDT"},
  {"name":"direction","type":"string","required":true,"description":"Currency that amount is given in: from for the source currency, to for the target currency.","example":"to","enum":["from","to"]},
  {"name":"amount","type":"string","required":true,"description":"Amount as a string, such as \"35103.1\". Range: 0.00000001 to 100000000000, inclusive; truncated to 8 decimals. No thousands separators, leading dot, exponent or spaces.","example":"35103.1"},
];
