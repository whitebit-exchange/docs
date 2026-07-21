// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/smart/investments).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"id","type":"string","required":false,"description":"Investment identifier","example":"0d7b66ff-1909-4938-ab7a-d16d9a64dcd5"},
  {"name":"ticker","type":"string","required":false,"description":"Invest plan source currency's ticker","example":"USDT"},
  {"name":"status","type":"integer","required":false,"description":"Investment status (1 - active, 2 - closed)","example":"1","enum":["1","2"]},
  {"name":"limit","type":"integer","required":false,"description":"LIMIT is a special clause used to limit records a particular query can return.","example":"100","default":100},
  {"name":"offset","type":"integer","required":false,"description":"Use the OFFSET clause to return entries starting from a particular line.","example":"0","default":0},
];
