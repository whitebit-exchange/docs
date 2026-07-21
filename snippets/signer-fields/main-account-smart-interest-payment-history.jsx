// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/smart/interest-payment-history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"planId","type":"string","required":false,"description":"Invest plan identifier","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"ticker","type":"string","required":false,"description":"Invest plan target currency's ticker","example":"USDT"},
  {"name":"limit","type":"integer","required":false,"description":"LIMIT is a special clause used to limit records a particular query can return.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Use the OFFSET clause to return entries starting from a particular line.","example":"0","default":0},
];
