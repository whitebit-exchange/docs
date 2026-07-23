// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/stop_limit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Trading pair. Format: BASE_QUOTE (e.g., BTC_USDT). Query GET /api/v4/public/markets for available markets.","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order side. Allowed values: buy, sell.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"Order quantity in base (stock) currency. Minimum and maximum values are market-dependent. Query GET /api/v4/public/markets for minAmount, minTotal, maxTotal. Precision: stockPrec.","example":"0.001"},
  {"name":"price","type":"string","required":false,"description":"Limit price per unit in quote (money) currency applied after the stop triggers. Required unless bboRole is set — the BBO execution method replaces the explicit price. Minimum an…","example":"9800"},
  {"name":"activation_price","type":"string","required":true,"description":"Trigger price in quote (money) currency. For buy orders, the stop triggers when the market price rises to or above the specified price. For sell orders, the stop triggers when t…","example":"10000"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"bboRole","type":"integer","required":false,"description":"Best Bid/Offer (BBO) execution method. The system selects the best market price for execution after the stop triggers. 1 = Queue method, 2 = Counterparty method. When bboRole is…","enum":["1","2"]},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
