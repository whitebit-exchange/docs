// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/positions/closed-pnl).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"startDate","type":"integer","required":false,"description":"Start of the query window as a Unix timestamp in seconds, applied to the position close time. Optional, no default. Must be ≤ endDate.","example":"1778000000"},
  {"name":"endDate","type":"integer","required":false,"description":"End of the query window as a Unix timestamp in seconds, applied to the position close time. Optional, no default. Must be ≥ startDate and ≤ now + 1s; violating values are reject…","example":"1778100000"},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 50. Minimum: 1. Maximum: 100.","example":"50","default":50},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0. The sum of offset and limit must not exceed 10000.","example":"0","default":0},
];
