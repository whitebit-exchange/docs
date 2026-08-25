// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/transfer/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"from_balance","type":"string","required":false,"description":"Balance FROM which funds moved. Acceptable values: **main**, **spot**, **collateral**. Do not send this parameter in order to receive transfers from every balance. Values are ca…","example":"main","enum":["main","spot","collateral"]},
  {"name":"to_balance","type":"string","required":false,"description":"Balance TO which funds moved. Acceptable values: **main**, **spot**, **collateral**. Do not send this parameter in order to receive transfers to every balance. Values are case-s…","example":"spot","enum":["main","spot","collateral"]},
  {"name":"limit","type":"integer","required":false,"description":"Number of records to return. Default: 100, Min: 1, Max: 100","example":"50","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0, Min: 0, Max: 10000","example":"0","default":0},
];
