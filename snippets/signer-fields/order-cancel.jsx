// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/cancel).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Available market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"orderId","type":"integer","required":false,"description":"Order Id. Example: 4180284841. Required if clientOrderId is not set.","example":"123456"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Custom client order id. Example: 'customId11'. Required if orderId is not set.","example":"customId11"},
];
