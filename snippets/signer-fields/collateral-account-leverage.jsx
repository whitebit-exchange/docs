// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/leverage).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"leverage","type":"integer","required":true,"description":"Target leverage level: 1, 2, 3, 5, 10, 20, 50 or 100. Coming soon: trading restrictions can set a lower maximum for the account. The market's max_leverage also applies.","example":"5"},
];
