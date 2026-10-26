// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/deposit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Base currency ticker of the fiat currency. Use EUR.","example":"EUR"},
  {"name":"provider","type":"string","required":true,"description":"Fiat provider for the deposit: SEPA_BCB_GROUP, SEPA_CLEAR_JUNCTION, FINCI, or SEPA_FINSEI. Confirm the providers enabled for the account with the Asset Status endpoint.","example":"SEPA_BCB_GROUP"},
  {"name":"amount","type":"string","required":true,"description":"Deposit amount in ticker units. The amount must be within the minimum and maximum deposit amounts of the provider and the deposit limits of the account.","example":"100"},
  {"name":"uniqueId","type":"string","required":true,"description":"Unique deposit identifier on the client side. Any string up to 255 characters; must be unique for the account. Use the value to find the deposit in the deposit/withdraw history.","example":"a7d3c9e2-6f14-4b8e-9d21-3c5e7f9a1b04"},
];
