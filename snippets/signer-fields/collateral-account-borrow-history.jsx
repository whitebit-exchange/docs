// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/collateral-account/borrow-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"asset","type":"string","required":false,"description":"Filter to a single asset. Optional — when omitted or empty, returns borrow history for every asset the caller's region allows to borrow. An unknown or region-blocked asset retur…","example":"BTC"},
  {"name":"startTime","type":"integer","required":false,"description":"Start of the query window as a Unix timestamp in seconds. Optional, default 0. Must be less than endTime.","example":"1700000000"},
  {"name":"endTime","type":"integer","required":false,"description":"End of the query window as a Unix timestamp in seconds. Optional, default: now. Must be greater than startTime.","example":"1700100000"},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 100. Minimum: 1. Maximum: 100.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Number of borrow positions to skip. Paging applies after engine state changes are grouped into positions, so page boundaries do not follow the count of underlying engine records…","example":"0","default":0},
];
