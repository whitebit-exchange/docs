// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/new).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Trading pair. Format: BASE_QUOTE (e.g., BTC_USDT). Query GET /api/v4/public/markets for available markets.","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order side. Allowed values: buy, sell.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"Order quantity in base (stock) currency. Minimum and maximum values are market-dependent. Query GET /api/v4/public/markets for minAmount, minTotal, maxTotal. Precision: stockPrec.","example":"0.001"},
  {"name":"price","type":"string","required":true,"description":"Limit price per unit in quote (money) currency. Minimum and maximum values are market-dependent. Precision: moneyPrec.","example":"9800"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"postOnly","type":"boolean","required":false,"description":"Post-only flag. When true, the order executes only as a maker order and the system rejects the order if it would match immediately. Default: false.","example":"false","default":false},
  {"name":"ioc","type":"boolean","required":false,"description":"Immediate-or-cancel (IOC) flag. When true, the matching engine executes all or part of the order immediately and cancels any unfilled portion. Default: false. IOC does not suppo…","example":"false","default":false},
  {"name":"bboRole","type":"integer","required":false,"description":"Best Bid/Offer (BBO) execution method. The system selects the best market price for execution. 1 = Queue method, 2 = Counterparty method. Use method 2 with the ioc flag.","enum":["1","2"]},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
  {"name":"rpi","type":"boolean","required":false,"description":"Enables Retail Price Improvement (RPI) mode. Default: false. RPI orders use post-only behavior by design. An RPI order does not support ioc=true. The API returns error code 40 w…","example":"true","default":false},
  {"name":"retail","type":"boolean","required":false,"description":"Retail-source taker flag. When true, the order is eligible to match against orders submitted by RPI makers and may receive price improvement at execution. Default: false. The Re…","example":"false","default":false},
];
