// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/cancel/bulk).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"orders","type":"array","required":true,"description":"Array of orders to cancel. From 1 to 100 items per request."},
];
