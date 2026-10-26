// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/convert/auto-confirm).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"from","type":"string","required":true,"description":"From currency. Example: BTC","example":"BTC"},
  {"name":"to","type":"string","required":true,"description":"To currency. Example: USDT","example":"USDT"},
  {"name":"direction","type":"string","required":true,"description":"Currency that amount is given in: from for the source currency, to for the target currency.","example":"from","enum":["from","to"]},
  {"name":"amount","type":"string","required":true,"description":"Amount as a string, such as \"0.1\". Range: 0.00000001 to 100000000000, inclusive; truncated to 8 decimals. A JSON number may be rounded, and the rounded value is converted.","example":"0.1"},
  {"name":"idempotencyKey","type":"string","required":false,"description":"Optional key, 8 to 128 characters of any kind; a UUID is typical. Omit the field instead of sending an empty string: an empty string claims no key, so a retry converts again.","example":"9f1c2b7e-4d3a-4f21-9c88-6e5b0a71d240"},
];
