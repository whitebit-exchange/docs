// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/market).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Trading pair. Format: BASE_QUOTE (e.g., BTC_USDT). Query GET /api/v4/public/markets for available markets.","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order side. Allowed values: buy, sell.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"For buy orders: total in quote (money) currency to spend. For sell orders: quantity in base (stock) currency to sell. Minimum and maximum values are market-dependent. Query GET …","example":"100"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
