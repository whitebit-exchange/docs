// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/refund-deposit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"transactionId","type":"string","required":true,"description":"Transaction UUID of the deposit. Obtain from the deposit.canceled webhook (uniqueId field) or from the deposit/withdraw history in the WhiteBIT interface.","example":"54bffeb7-7a8f-43f8-bcd8-f14ec10fee85"},
  {"name":"address","type":"string","required":true,"description":"Destination wallet address for the refund. The address must support the same network and asset as the original deposit. Cannot be a WhiteBIT address. Does not have to match the …","example":"0x1234567890abcdef1234567890abcdef12345678"},
];
