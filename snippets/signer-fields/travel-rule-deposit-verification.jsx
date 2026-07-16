// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/travel-rule/deposit/verification).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"uniqueId","type":"string","required":true,"description":"Transaction external ID (from deposit/withdraw history)","example":"550e8400-e29b-41d4-a716-446655440000"},
  {"name":"walletType","type":"string","required":true,"description":"Wallet type: - hosted - VASP-hosted wallet (exchange, custodian). Requires vaspData object. - unhosted - Self-custody wallet (hardware wallet, software wallet).","example":"hosted","enum":["hosted","unhosted"]},
  {"name":"originator","type":"object","required":true,"description":"Originator information for travel rule compliance"},
  {"name":"vaspData","type":"object","required":false,"description":"VASP (Virtual Asset Service Provider) information. Required when walletType is hosted. Provide either vaspId (if VASP is in the list from /travel-rule/vasps) or vaspName (if not…"},
];
