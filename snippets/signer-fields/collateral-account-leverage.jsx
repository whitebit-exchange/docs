// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/leverage).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"leverage","type":"integer","required":true,"description":"Target leverage level. Accepted values: 1, 2, 3, 5, 10, 20, 50, 100. The effective maximum depends on the market's max_leverage.","example":"5"},
];
