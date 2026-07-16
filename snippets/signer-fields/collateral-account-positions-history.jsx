// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/positions/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"market","type":"string","required":false,"description":"Filter by specific market. Example: BTC_USDT If not specified, returns position history for all markets.","example":"BTC_USDT"},
  {"name":"positionId","type":"integer","required":false,"description":"Filter by specific position identifier. If not specified, returns history for all positions.","example":"1"},
  {"name":"startDate","type":"integer","required":false,"description":"Start of the query window as a Unix timestamp in seconds. Optional, no default. Must be ≤ endDate.","example":"1650400000"},
  {"name":"endDate","type":"integer","required":false,"description":"End of the query window as a Unix timestamp in seconds. Optional, no default. Must be ≥ startDate and ≤ now + 1s; violating values are rejected with a validation error.","example":"1650500000"},
];
