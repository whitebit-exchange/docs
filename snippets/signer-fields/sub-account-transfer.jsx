// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/transfer).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"id","type":"string","required":true,"description":"Sub-account id","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"direction","type":"string","required":true,"description":"Transfer direction","example":"main_to_sub","enum":["main_to_sub","sub_to_main"]},
  {"name":"amount","type":"string","required":true,"description":"Transfer amount (min 0.00000001)","example":"0.5"},
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker","example":"ETH"},
];
