// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/market/fee/single).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Market to return the fee for. The market must be a spot, margin, or futures market available for trading in the caller's region. Example: BTC_USDT","example":"BTC_USDT"},
];
