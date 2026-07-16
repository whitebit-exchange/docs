// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/accounts/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"name","type":"string","required":true,"description":"Mining pool account name. Must be unique. Alphanumeric characters and underscores allowed.","example":"my_miner_01"},
  {"name":"referralCode","type":"string","required":false,"description":"Optional referral code for account creation","example":"REF123"},
];
