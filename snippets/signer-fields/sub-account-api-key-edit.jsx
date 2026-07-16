// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/api-key/edit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"apiKeyId","type":"string","required":true,"description":"ID of the API key to update","example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"},
  {"name":"title","type":"string","required":true,"description":"New title for the API key","example":"Trading Bot Key"},
  {"name":"urls","type":"array","required":true,"description":"Array of URL objects for API key restrictions"},
];
