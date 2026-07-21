// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/balances).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"id","type":"string","required":true,"description":"Sub-account id","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"ticker","type":"string","required":false,"description":"Currency's ticker (if not provided, returns data by all currencies)","example":"USDC"},
];
