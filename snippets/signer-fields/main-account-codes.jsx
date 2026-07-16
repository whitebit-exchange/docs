// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/codes).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker. Example: BTC","example":"ETH"},
  {"name":"amount","type":"string","required":true,"description":"Amount to transfer. Up to 18 decimal places, value greater than zero and capped at 1e17 (10^17), and not exceeding the main balance.","example":"0.002"},
  {"name":"passphrase","type":"string","required":false,"description":"Passphrase for applying WhiteBIT codes. Passphrase must contain only latin letters, numbers and symbols (like !@#$%^, no whitespaces). Max: 25 symbols.","example":"some passphrase"},
  {"name":"description","type":"string","required":false,"description":"Additional text description for code. Visible only for creator. Max: 280 symbols.","example":"some description"},
];
