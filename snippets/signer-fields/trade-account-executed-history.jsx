// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/trade-account/executed-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Requested market. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"clientOrderId","type":"string","required":false,"description":"Look up by custom client order identifier. When supplied, the endpoint switches to single-order lookup mode and returns the matching order's deal history. Returns 422 with \"Orde…","example":"customId11"},
  {"name":"startDate","type":"integer","required":false,"description":"Start date in Unix-time format","example":"1593233939"},
  {"name":"endDate","type":"integer","required":false,"description":"End date in Unix-time format","example":"1593233939"},
  {"name":"offset","type":"integer","required":false,"description":"Starting line index (OFFSET). Default: 0, Min: 0","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"LIMIT is a special clause used to limit records a particular query can return. Default: 50, Min: 1, Max: 500","example":"50","default":50},
];
