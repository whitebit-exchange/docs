// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/refund-deposit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"transactionId","type":"string","required":true,"description":"Transaction UUID of the deposit. Obtain it from the deposit/withdraw history in the WhiteBIT interface: a deposit in status 9 sends no webhook.","example":"54bffeb7-7a8f-43f8-bcd8-f14ec10fee85"},
  {"name":"address","type":"string","required":true,"description":"Destination wallet address for the refund. The address must support the same network and asset as the original deposit. Cannot be a WhiteBIT deposit address. Does not have to ma…","example":"0x1234567890abcdef1234567890abcdef12345678"},
  {"name":"memo","type":"string","required":false,"description":"Destination memo for the refund address. Optional — without it, the refund goes to the address with no memo. For a currency that uses memos, the system validates the value; an i…","example":"1234567890"},
];
