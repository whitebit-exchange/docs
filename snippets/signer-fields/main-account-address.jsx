// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/address).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currencies ticker. Example: BTC ⚠️ Currency ticker should not be fiat and it’s “can_deposit” status must be “true”. See Asset Status endpoint response for the status.","example":"BTC"},
  {"name":"network","type":"string","required":false,"description":"Cryptocurrency network. ⚠️ If currency has multiple networks like USDT, specify the network to use. See ticker networks list in “networks” field from response Asset Status endpo…","example":"ERC20"},
];
