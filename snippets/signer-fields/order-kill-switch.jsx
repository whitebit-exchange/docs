// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/kill-switch).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Available market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"timeout","type":"string","required":true,"description":"Timer value in seconds ('5'-'600'), or null to delete the existing timer. The key must always be present — omitting it fails validation.","example":"60","nullable":true},
  {"name":"types","type":"array","required":false,"description":"Order types to target. Valid values: \"spot\" — standard spot orders. \"margin\" — marginal orders placed on spot markets. Note: the \"margin\" value is not the same as the collateral…","example":"spot,margin"},
];
