// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/withdraw/unconfirmed-list).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"limit","type":"integer","required":false,"description":"Number of records to return.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip.","example":"0","default":0},
  {"name":"subAccountId","type":"string","required":false,"description":"Filter by specific sub-account external ID. If omitted, returns withdrawals from all sub-accounts.","example":"a1b2c3d4-5678-90ab-cdef-1234567890ab"},
];
