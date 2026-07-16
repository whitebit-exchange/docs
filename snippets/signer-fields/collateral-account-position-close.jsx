// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/position/close).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"positionId","type":"integer","required":true,"description":"Unique identifier of the position to close. Obtain from the open positions endpoint.","example":"123"},
  {"name":"positionSide","type":"string","required":false,"description":"Defines the position direction when hedge mode is enabled. See positionSide","example":"LONG","enum":["LONG","SHORT","BOTH"]},
  {"name":"market","type":"string","required":true,"description":"Market of the position to close. Example: BTC_USDT","example":"BTC_USDT"},
];
