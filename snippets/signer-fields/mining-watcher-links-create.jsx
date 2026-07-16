// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/mining/watcher-links/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"accounts","type":"array","required":true,"description":"Array of mining account names","example":"my_miner_01,my_miner_02"},
  {"name":"name","type":"string","required":true,"description":"Link name (alphanumeric and underscores only)","example":"monitoring_link"},
  {"name":"permissions","type":"array","required":true,"description":"Array of permissions","example":"dashboard,workers"},
  {"name":"liveUntil","type":"string","required":true,"description":"Expiration period","example":"7d","enum":["1h","24h","7d","always"]},
];
