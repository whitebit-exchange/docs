// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/bulk).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"orders","type":"array","required":true,"description":"Array of limit orders. Each item is validated with the same rules as a single limit order."},
  {"name":"stopOnFail","type":"boolean","required":false,"description":"Controls how the bulk order processor handles failures. When true: Processing stops at the first order that fails validation or execution. Only orders up to (but not including) …","example":"true","default":false},
];
