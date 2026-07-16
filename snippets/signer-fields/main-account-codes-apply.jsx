// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/codes/apply).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"code","type":"string","required":true,"description":"Code that will be applied.","example":"WBe11f4fce-2a53-4edc-b195-66b693bd77e3ETH"},
  {"name":"passphrase","type":"string","required":false,"description":"Should be provided if the code was created with passphrase. Max: 25 symbols.","example":"some passphrase"},
];
