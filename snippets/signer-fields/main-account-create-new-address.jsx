// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/create-new-address).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker.","example":"XLM"},
  {"name":"network","type":"string","required":false,"description":"Currency's network (for multinetwork currencies). Example: OMNI or TRC20 or ERC20. For USDT default network is ERC20(ETH).","example":"ERC20"},
  {"name":"type","type":"string","required":false,"description":"Address type, available for specific currencies list (see address types table in endpoint description)","example":"bech32","enum":["p2sh-segwit","bech32"]},
];
