// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/fiat-deposit-url).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker (fiat). ⚠️ Currencies ticker should be fiat and has \"can_deposit\" status must be \"true\". Use Asset Status endpoint to know more about currency.","example":"UAH"},
  {"name":"provider","type":"string","required":true,"description":"Fiat currency provider. ⚠️ Currency provider should be taken from Asset Status endpoint response.","example":"VISAMASTER"},
  {"name":"amount","type":"string","required":true,"description":"Deposit amount","example":"100"},
  {"name":"uniqueId","type":"string","required":true,"description":"Unique transaction identifier on client's side. Any string up to 255 characters; not validated as a UUID.","example":"qw22"},
  {"name":"customer","type":"object","required":false,"description":"Customer information (required for USD/EUR with VISAMASTER provider)"},
  {"name":"successLink","type":"string","required":false,"description":"Customer will be redirected to this URL by acquiring provider after success deposit. To activate this feature, please contact support","example":"https://success.example.com"},
  {"name":"failureLink","type":"string","required":false,"description":"Customer will be redirected to this URL in case of fail or rejection on acquiring provider side. To activate this feature, please contact support","example":"https://failure.example.com"},
  {"name":"returnLink","type":"string","required":false,"description":"Customer will be redirected to the URL defined if selects 'back' option after from the payment success or failure page. To activate this feature, define desired link. If not pop…","example":"https://return.example.com"},
];
