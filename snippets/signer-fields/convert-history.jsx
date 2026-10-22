// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/convert/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"fromTicker","type":"string","required":false,"description":"From currency. Example: BTC","example":"BTC"},
  {"name":"toTicker","type":"string","required":false,"description":"To currency. Example: USDT","example":"USDT"},
  {"name":"from","type":"string","required":false,"description":"Start of the time filter, as a Unix timestamp in seconds, sent as a string or integer. Must be no more than 30 days before to and no older than 6 months. Example: 1699260637.","example":"1699260637"},
  {"name":"to","type":"string","required":false,"description":"End of the time filter, as a Unix timestamp in seconds, sent as a string or integer. Must be no more than 30 days after from. Example: 1699260637. Default: now; a value later th…","example":"1699260637"},
  {"name":"quoteId","type":"string","required":false,"description":"Quote Id. Example: 4050","example":"4050"},
  {"name":"limit","type":"integer","required":false,"description":"How many records to receive. Allowed range: 1–100. Default: 100","example":"100"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip for pagination. Minimum: 0. Default: 0","example":"0"},
];
