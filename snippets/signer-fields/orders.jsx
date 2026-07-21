// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/orders).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Trading pair to filter by. Format: BASE_QUOTE (e.g., BTC_USDT). Omit to retrieve orders across all markets.","example":"BTC_USDT"},
  {"name":"orderId","type":"integer","required":false,"description":"Filter by a specific order identifier. Returns only the matching active order.","example":"3134995325"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Filter by custom client order identifier. Returns only the matching active order.","example":"customId11"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0. Maximum: 4294967295.","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 50. Minimum: 1. Maximum: 100.","example":"50","default":50},
];
