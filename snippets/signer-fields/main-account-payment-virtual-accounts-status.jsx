// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/payment/virtual-accounts/status).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Base currency ticker of the fiat currency. Use EUR.","example":"EUR"},
  {"name":"provider","type":"string","required":true,"description":"Fiat provider of the virtual account. Use SEPA_BCB_GROUP.","example":"SEPA_BCB_GROUP"},
];
