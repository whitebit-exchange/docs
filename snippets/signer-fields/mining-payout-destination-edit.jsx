// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/payout-destination/edit).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"accountName","type":"string","required":true,"description":"Mining pool account name","example":"my_miner_01"},
  {"name":"destination","type":"string","required":true,"description":"Payout destination type","example":"external_address","enum":["main_balance","external_address"]},
  {"name":"address","type":"string","required":false,"description":"External BTC address. Required when destination is external_address. Supports all standard Bitcoin address formats.","example":"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"},
];
