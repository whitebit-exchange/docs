// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/collateral/limit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Available margin market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order type. Variables: 'buy' / 'sell'. For open long position use **buy**, for short **sell**.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"Amount of stock currency to buy or sell. Minimum and step values are market-dependent — query the market info endpoint for constraints.","example":"0.01"},
  {"name":"price","type":"string","required":true,"description":"Limit order price in money currency. Minimum price step is market-dependent — query the market info endpoint for constraints.","example":"40000"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"stopLoss","type":"string","required":false,"description":"Stop loss price. When provided, the system creates an OTO order with a stop loss condition.","example":"50000"},
  {"name":"takeProfit","type":"string","required":false,"description":"Take profit price. When provided, the system creates an OTO order with a take profit condition.","example":"30000"},
  {"name":"postOnly","type":"boolean","required":false,"description":"When true, guarantees the order executes as a maker order. The system rejects the order if it would immediately match as taker. Default: false.","example":"false","default":false},
  {"name":"ioc","type":"boolean","required":false,"description":"When true, the order executes all or part immediately and cancels any unfilled portion. Cannot be combined with postOnly=true or rpi=true.","example":"false","default":false},
  {"name":"rpi","type":"boolean","required":false,"description":"Enables Retail Price Improvement (RPI) mode. RPI orders are post-only by design and cannot be used with ioc=true. The API returns error code 40 when both rpi=true and ioc=true a…","example":"true","default":false},
  {"name":"positionSide","type":"string","required":false,"description":"Position direction. Optional at the request layer but functionally required when hedge mode is enabled. See positionSide. - **One-way mode** (default account mode): the field is…","example":"LONG","enum":["LONG","SHORT","BOTH"]},
  {"name":"reduceOnly","type":"boolean","required":false,"description":"When true, the order can only reduce or close an existing position — the order cannot increase the position or open a new one. If the order amount exceeds the current position s…","example":"false","default":false},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
