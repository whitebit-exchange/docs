// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/aml/checks/history).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"limit","type":"integer","required":false,"description":"Default: 100.","example":"50"},
  {"name":"offset","type":"integer","required":false,"description":"Default: 0.","example":"0"},
  {"name":"from","type":"integer","required":false,"description":"Start timestamp (Unix).","example":"1704067200"},
  {"name":"to","type":"integer","required":false,"description":"End timestamp (Unix).","example":"1706745599"},
  {"name":"status","type":"array","required":false,"description":"in_progress, success, failed.","example":"success,in_progress"},
  {"name":"address","type":"string","required":false,"description":"Address filter.","example":"0x28C6c06298d514Db089934071355E5743bf21d60"},
  {"name":"asset","type":"array","required":false,"description":"Asset filter.","example":"USDT,USDC"},
  {"name":"network","type":"array","required":false,"description":"Applied only when asset is provided.","example":"ERC20,TRC20"},
  {"name":"riskLevel","type":"array","required":false,"description":"low, medium, high.","example":"medium,high"},
];
