// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/trade-account/order).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"orderId","type":"integer","required":true,"description":"Identifier of the order to retrieve deals for.","example":"3134995325"},
  {"name":"offset","type":"integer","required":false,"description":"Number of records to skip. Default: 0.","example":"0","default":0},
  {"name":"limit","type":"integer","required":false,"description":"Maximum number of records to return. Default: 50.","example":"50","default":50},
];
