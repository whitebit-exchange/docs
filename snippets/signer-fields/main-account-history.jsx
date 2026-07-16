// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"transactionMethod","type":"integer","required":false,"description":"Method. Example: **1** to display deposits / **2** to display withdraws. Do not send this parameter in order to receive both deposits and withdraws.","example":"1","enum":["1","2"]},
  {"name":"ticker","type":"string","required":false,"description":"Currency's ticker. Example: BTC","example":"BTC"},
  {"name":"address","type":"string","required":false,"description":"Can be used for filtering transactions by specific address.","example":"3ApEASLcrQtZpg1TsssFgYF5V5YQJAKvuE"},
  {"name":"memo","type":"string","required":false,"description":"Can be used for filtering transactions by specific memo","example":"48565488244493"},
  {"name":"addresses","type":"array","required":false,"description":"Can be used for filtering transactions by specific array of addresses.","example":"3ApEASLcrQtZpg1TsssFgYF5V5YQJAKvuE"},
  {"name":"unique_id","type":"string","required":false,"description":"Can be used for filtering transactions by specific unique id","example":"24529041"},
  {"name":"limit","type":"integer","required":false,"description":"LIMIT is a special clause used to limit records a particular query can return. Default: 50, Min: 1, Max: 500","example":"100","default":50},
  {"name":"offset","type":"integer","required":false,"description":"Use the OFFSET clause to return entries starting from a particular line.","example":"0","default":0},
  {"name":"status","type":"array","required":false,"description":"Can be used for filtering transactions by status codes. ⚠️ Caution: Use this parameter with the appropriate transactionMethod and valid status codes for that method. See the end…","example":"3,7"},
];
