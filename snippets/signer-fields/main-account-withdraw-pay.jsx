// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/withdraw-pay).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currencies ticker. Example: BTC ⚠️ Currencies ticker must have \"can_deposit\" status equal to \"true\". Use Asset Status endpoint to know more about currency.","example":"ETH"},
  {"name":"amount","type":"string","required":true,"description":"Withdraw amount (including fee). To add the fee to the specified amount, use the /main-account/withdraw-pay request","example":"0.9"},
  {"name":"address","type":"string","required":true,"description":"Target address (wallet address for cryptocurrencies, identifier/card token for fiat currencies)","example":"0x0964A6B8F794A4B8d61b62652dB27ddC9844FB4c"},
  {"name":"memo","type":"string","required":false,"description":"Required if currency is memoable. See memo for details.","example":"48565488244493"},
  {"name":"uniqueId","type":"string","required":true,"description":"Unique transaction identifier. Any string up to 255 characters; not validated as a UUID. ⚠️ Generate a new unique ID for each withdrawal request.","example":"24529041"},
  {"name":"provider","type":"string","required":false,"description":"Fiat currency provider. Example: VISAMASTER ⚠️ Currency provider should be taken from Asset Status endpoint response. Required if currency is fiat.","example":"VISAMASTER"},
  {"name":"network","type":"string","required":false,"description":"Cryptocurrency network. Available for multinetwork currencies. Example: OMNI ⚠️ Currency network should be taken from Asset Status endpoint response. Default for USDT is ERC20","example":"ERC20"},
  {"name":"partialEnable","type":"boolean","required":false,"description":"Optional parameter for FIAT withdrawals with increased Maximum Limit if set as \"true\". To use this parameter, the application must support \"Partially successful\" withdrawal stat…","example":"false"},
  {"name":"customerIp","type":"string","required":false,"description":"End-customer IP address forwarded to the fiat provider for antifraud checks before the withdrawal is processed. ⚠️ Required if currency ticker is USD or EUR with VISAMASTER prov…","example":"203.0.113.42"},
  {"name":"beneficiary","type":"object","required":false,"description":"Beneficiary information data. Required if currency ticker is one of: UAH_IBAN, USD_VISAMASTER, EUR_VISAMASTER, USD, EUR"},
  {"name":"travelRule","type":"object","required":false,"description":"Travel Rule information data. Required if currency is crypto and the account is from EEA"},
];
