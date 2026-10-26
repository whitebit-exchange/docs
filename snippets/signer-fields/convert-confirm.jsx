// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/convert/confirm).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"quoteId","type":"string","required":true,"description":"Quote ID returned by Convert Estimate. An integer, sent as a JSON number or a numeric string. Allowed range: 1 to 100000000000; a value below the range returns 422 with code 30.","example":"4050"},
];
