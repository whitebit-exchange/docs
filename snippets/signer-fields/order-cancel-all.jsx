// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/cancel/all).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Available market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"type","type":"array","required":false,"description":"Order types to target. Valid values: \"spot\" — standard spot orders. \"margin\" — marginal orders placed on spot markets. Note: the \"margin\" value is not the same as the collateral…","example":"spot,margin,futures"},
];
