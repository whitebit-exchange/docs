// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/funding-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Market to return funding history for. For example: BTC_PERP Required — there is no all-markets mode. Spot markets are rejected.","example":"BTC_PERP"},
  {"name":"limit","type":"integer","required":false,"description":"Number of records to return","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip","example":"0","default":0},
];
