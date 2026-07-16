// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/transfer/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"id","type":"string","required":true,"description":"Sub-account id","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"direction","type":"string","required":false,"description":"Transfer direction (optional)","example":"main_to_sub","enum":["main_to_sub","sub_to_main"]},
  {"name":"limit","type":"integer","required":false,"example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"example":"0","default":0},
];
