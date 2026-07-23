// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/oco-cancel).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Market of the OCO order to cancel. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"orderId","type":"integer","required":false,"description":"OCO order identifier (the id returned at creation and by the OCO listings). Required if clientOrderId is not set; mutually exclusive with clientOrderId.","example":"117703764513"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Client-defined order ID supplied at order creation. Required if orderId is not set; mutually exclusive with orderId.","example":"customId11"},
];
