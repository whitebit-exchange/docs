// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/stock_market).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Trading pair. Format: BASE_QUOTE (e.g., BTC_USDT). Query GET /api/v4/public/markets for available markets.","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order side. Allowed values: buy, sell.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"Order quantity in base (stock) currency for both buy and sell sides. To place a market order specifying the quote (money) currency amount instead, use POST /api/v4/order/market.…","example":"0.001"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
