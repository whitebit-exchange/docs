// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/api-key/list).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"subAccountId","type":"string","required":false,"description":"ID of the sub-account to list API keys for","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"limit","type":"integer","required":false,"example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"example":"0","default":0},
];
