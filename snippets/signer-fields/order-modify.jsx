// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/modify).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"orderId","type":"integer","required":false,"description":"Active order id. Required if clientOrderId is not set.","example":"4180284841"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Identifier should be unique and contain letters, dashes, numbers, dots or underscores. Required if orderId is not set.","example":"order1987111"},
  {"name":"market","type":"string","required":true,"description":"Available market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"amount","type":"string","required":false,"description":"Amount of stock currency to buy or sell. Example: '0.001' or 0.001","example":"0.001"},
  {"name":"total","type":"string","required":false,"description":"Total of money currency to buy or sell. Example: '0.001' or 0.001","example":"100"},
  {"name":"price","type":"string","required":false,"description":"Price in money currency. Example: '9800' or 9800","example":"9800"},
  {"name":"activationPrice","type":"string","required":false,"description":"Activation price in money currency. Example: '10000' or 10000","example":"10000"},
  {"name":"stp","type":"string","required":false,"description":"Self-trade prevention mode. Allowed values: no (self-trades allowed), cb (cancel both the new and the existing order), cn (cancel the new order, keep the existing), co (cancel t…","example":"no","enum":["no","cb","cn","co"],"default":"no"},
];
