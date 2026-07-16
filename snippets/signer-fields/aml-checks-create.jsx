// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/aml/checks/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"asset","type":"string","required":true,"description":"Asset symbol supported by the Address Checker.","example":"string"},
  {"name":"address","type":"string","required":true,"description":"Cryptocurrency address to screen.","example":"string"},
  {"name":"network","type":"string","required":false,"description":"Network identifier. May be null when not required.","example":"string","nullable":true},
];
