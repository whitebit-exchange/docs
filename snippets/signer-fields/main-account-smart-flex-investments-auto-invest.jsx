// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/smart-flex/investments/auto-invest).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"plan","type":"string","required":true,"description":"Plan external ID (UUID).","example":"8f2e9d3c-1a4b-4c2d-9e5f-6a7b8c9d0e1f"},
  {"name":"enabled","type":"boolean","required":false,"description":"Enable or disable auto-reinvestment.","example":"true","default":false},
];
