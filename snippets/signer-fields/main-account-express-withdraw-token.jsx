// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/express-withdraw/token).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currency ticker to charge. Example: USDT ⚠️ The ticker must be a withdrawal-enabled cryptocurrency; the endpoint rejects fiat tickers. Use Asset Status endpoint to check the wit…","example":"USDT"},
  {"name":"amount","type":"string","required":true,"description":"Amount to charge in the specified ticker. Numeric string. ⚠️ The amount converted to USDT-equivalent must not exceed 10,000; the endpoint rejects larger amounts with error code …","example":"25.50"},
  {"name":"externalId","type":"string","required":true,"description":"Partner-side reference for the payment (order or invoice identifier), unique per partner account. The identifier powers idempotency and replay protection: a pending externalId w…","example":"order-100294"},
];
