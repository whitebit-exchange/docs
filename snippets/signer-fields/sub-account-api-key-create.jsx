// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/api-key/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"type","type":"integer","required":true,"description":"Type of API key (1 - info and trading; 2 - info, trading, deposits, withdraws)","example":"1","enum":["1","2"]},
  {"name":"subAccountId","type":"string","required":true,"description":"ID of the sub-account to create the API key for","example":"8e667b4a-0b71-4988-8af5-9474dbfaeb51"},
  {"name":"title","type":"string","required":false,"description":"Custom title/name for the API key","example":"Trading Bot Key"},
];
