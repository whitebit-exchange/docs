// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/codes/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"limit","type":"integer","required":false,"description":"LIMIT is a special clause used to limit records a particular query can return.","example":"100","default":30},
  {"name":"offset","type":"integer","required":false,"description":"Use the OFFSET clause to return entries starting from a particular line.","example":"0","default":0},
];
