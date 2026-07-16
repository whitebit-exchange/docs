// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/transfer).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"method","type":"string","required":false,"description":"Transfer method. ⚠️ We highly recommend to use **from** and **to** fields, which provides more flexibility. This way will be deprecated in future. Example: **deposit** to transf…","example":"deposit","enum":["deposit","withdraw","collateral-deposit","collateral-withdraw"]},
  {"name":"from","type":"string","required":false,"description":"Balance FROM which funds will move to. Acceptable values: **main**, **spot**, **collateral** **Not required** if **method** is set.","example":"main","enum":["main","spot","collateral"]},
  {"name":"to","type":"string","required":false,"description":"Balance TO which funds will move to. Acceptable values: **main**, **spot**, **collateral** **Not required** if **method** is set.","example":"spot","enum":["main","spot","collateral"]},
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker. Example: BTC","example":"XLM"},
  {"name":"amount","type":"string","required":true,"description":"Amount to transfer. Max precision = 8, value must be greater than zero and less than or equal to the available balance.","example":"0.9"},
];
