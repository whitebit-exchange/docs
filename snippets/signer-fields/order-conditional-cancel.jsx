// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/conditional-cancel).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Market of the conditional order to cancel. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"id","type":"integer","required":true,"description":"Conditional order identifier. Obtain from the query unexecuted conditional orders endpoint.","example":"117703764513"},
];
