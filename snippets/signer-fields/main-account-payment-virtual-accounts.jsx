// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/payment/virtual-accounts).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Base currency ticker of the fiat currency. Use EUR.","example":"EUR"},
  {"name":"provider","type":"string","required":true,"description":"Fiat provider that issues the virtual account. Use SEPA_BCB_GROUP. Confirm the providers enabled for the account with the Asset Status endpoint.","example":"SEPA_BCB_GROUP"},
];
