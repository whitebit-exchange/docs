// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"alias","type":"string","required":true,"description":"Name for sub-account","example":"trading_bot"},
  {"name":"email","type":"string","required":false,"description":"Sub-account email (required when shareKyc is false)","example":"sub@example.com"},
  {"name":"shareKyc","type":"boolean","required":false,"description":"If KYC shared with main account","example":"false"},
  {"name":"permissions","type":"object","required":true},
];
