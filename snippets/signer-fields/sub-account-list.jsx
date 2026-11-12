// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/list).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"search","type":"string","required":false,"description":"Returns only sub-accounts whose alias or email contains this text. To find one sub-account by alias, compare alias in the results exactly, because the search also returns sub-ac…","example":"trading"},
  {"name":"limit","type":"integer","required":false,"example":"30","default":30},
  {"name":"offset","type":"integer","required":false,"example":"0","default":0},
];
