// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/api-key/ip-address/delete).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"apiKeyId","type":"string","required":true,"description":"ID of the API key to remove IP address from","example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"},
  {"name":"ip","type":"string","required":true,"description":"IP address to remove from allowed list","example":"192.168.1.100"},
];
