// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/trade-account/order/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Trading pair to filter by. Format: BASE_QUOTE (e.g., BTC_USDT). Omit to retrieve orders across all markets.","example":"BTC_USDT"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Look up a specific order by the custom client identifier. When supplied, the endpoint switches to single-order lookup mode and the startDate, endDate, and status filters are ign…","example":"customId11"},
  {"name":"orderId","type":"integer","required":false,"description":"Look up a specific order by the exchange-assigned identifier. When supplied, the endpoint switches to single-order lookup mode and the startDate, endDate, and status filters are…","example":"4986126152"},
  {"name":"status","type":"string","required":false,"description":"Filter list-mode results by order status. Ignored when orderId or clientOrderId is supplied.","example":"FILLED","enum":["ALL","FILLED","CANCELED","PARTIALLY_FILLED"],"default":"ALL"},
  {"name":"startDate","type":"integer","required":false,"description":"Start of the query window as a Unix timestamp in seconds. Default: now - 1 month. The earliest reachable date is 6 months ago (00:00 UTC) — requests with an older startDate are …","example":"1697000000"},
  {"name":"endDate","type":"integer","required":false,"description":"End of the query window as a Unix timestamp in seconds. Default: now. Values greater than the current time are silently clamped to now. The maximum span between startDate and en…","example":"1699000000"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0.","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 50. Minimum: 1. Maximum: 500.","example":"50","default":50},
];
