// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/collateral/oco).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Available margin market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"side","type":"string","required":true,"description":"Order direction. Use buy to open or increase a long position and sell to open or increase a short position.","example":"buy","enum":["buy","sell"]},
  {"name":"amount","type":"string","required":true,"description":"Amount of stock currency for both legs of the OCO order. Minimum and step values are market-dependent — query the market info endpoint for constraints.","example":"0.001"},
  {"name":"price","type":"string","required":true,"description":"Limit order price in money currency for the take-profit leg.","example":"40000"},
  {"name":"activation_price","type":"string","required":true,"description":"Trigger price in money currency for the stop-loss leg. The stop-limit order activates when the market price reaches the specified value.","example":"41000"},
  {"name":"stop_limit_price","type":"string","required":true,"description":"Execution price in money currency for the stop-loss leg. After activation, the stop-loss leg places a limit order at the specified price.","example":"42000"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order identifier. Uniqueness is enforced only among the account's open (pending) orders on the same market — once a previous order is filled or canceled, the same …","example":"order1987111"},
  {"name":"reduceOnly","type":"boolean","required":false,"description":"When true, both legs of the OCO order can only reduce or close an existing position — neither leg can increase the position or open a new one. If the order amount exceeds the cu…","example":"false","default":false},
  {"name":"positionSide","type":"string","required":false,"description":"Position direction. Optional at the request layer but functionally required when hedge mode is enabled. See positionSide. Both legs of the OCO inherit the value. - **One-way mod…","example":"LONG","enum":["LONG","SHORT","BOTH"]},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. The value applies to both legs of the OCO order. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cance…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
