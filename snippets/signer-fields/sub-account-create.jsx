// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/sub-account/create).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"alias","type":"string","required":true,"description":"Sub-account name, up to 127 characters. Unique among the main account's sub-accounts; the alias of a deleted sub-account can be used again.","example":"trading_bot"},
  {"name":"email","type":"string","required":false,"description":"End user's email. Required when shareKyc is false or omitted; leave it out when shareKyc is true. Any email starts the invitation flow, and the sub-account stays inactive until …","example":"sub@example.com"},
  {"name":"shareKyc","type":"boolean","required":false,"description":"Share the main account's KYC with the sub-account. With true, leave email out; the sub-account is then active at creation","example":"false"},
  {"name":"permissions","type":"object","required":true},
];
