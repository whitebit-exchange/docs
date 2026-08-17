// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/trade-account/order/history/query).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Trading pair to filter by. Format: BASE_QUOTE (e.g., BTC_USDT), matching the pattern ^[A-Z0-9]+_[A-Z0-9]+$. Omit to retrieve records across all markets.","example":"BTC_USDT"},
  {"name":"status","type":"string","required":false,"description":"Category filter — distinct from the response status field. filled returns only reverse close orders (clientOrderId prefixed with delisting-), which carry delistingKind = reverse…","example":"filled","enum":["filled","delisting","maintenance"]},
  {"name":"startDate","type":"integer","required":false,"description":"Start of the query window as a Unix timestamp in seconds. Default: now - 30 days. Must not be later than endDate.","example":"1731369600"},
  {"name":"endDate","type":"integer","required":false,"description":"End of the query window as a Unix timestamp in seconds. Default: now. Values greater than the current time are clamped to now. The maximum span between startDate and endDate is …","example":"1733961600"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0. The sum of offset and limit must not exceed 10000.","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 500. Minimum: 1. Maximum: 500.","example":"500","default":500},
];
