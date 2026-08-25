// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/order/oto-cancel).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":true,"description":"Market of the OTO order to cancel. Example: BTC_USDT","example":"BTC_USDT"},
  {"name":"otoId","type":"integer","required":true,"description":"OTO order identifier. Obtain from the query unexecuted conditional orders endpoint — the id field of every record with type set to oto.","example":"29457221"},
];
