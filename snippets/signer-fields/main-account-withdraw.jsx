// AUTO-GENERATED — do not edit manually.
// Source: openapi/private/*.yaml (requestBody + query/path parameters of /api/v4/main-account/withdraw).
// Regenerate: node scripts/generate-signer-fields.mjs

export const signerFields = [
  {"name":"ticker","type":"string","required":true,"description":"Currency's ticker. Example: BTC ⚠️ Currencies ticker must have \"can_deposit\" status equal to \"true\". Use Asset Status endpoint to know more about currency.","example":"ETH"},
  {"name":"amount","type":"string","required":true,"description":"Withdraw amount (including fee). To add the fee to the specified amount, use the /main-account/withdraw-pay request.","example":"0.9"},
  {"name":"address","type":"string","required":true,"description":"Target address (wallet address for cryptocurrencies, identifier/card token for fiat currencies)","example":"0x0964A6B8F794A4B8d61b62652dB27ddC9844FB4c"},
  {"name":"memo","type":"string","required":false,"description":"Memo. ⚠️ Required if currency is memoable.","example":"48565488244493"},
  {"name":"uniqueId","type":"string","required":true,"description":"Unique transaction identifier. Any string up to 255 characters; not validated as a UUID. ⚠️ Generate a new unique ID for each withdrawal request.","example":"24529041"},
  {"name":"provider","type":"string","required":false,"description":"Fiat currency provider. Example: VISAMASTER ⚠️ Required for fiat currencies. Currency provider should be taken from Asset Status endpoint response.","example":"VISAMASTER"},
  {"name":"network","type":"string","required":false,"description":"Cryptocurrency network. Available for multi network currencies. Example: OMNI ⚠️ Currency network should be taken from Asset Status endpoint response. Default for USDT is ERC20","example":"ERC20"},
  {"name":"partialEnable","type":"boolean","required":false,"description":"Optional parameter for FIAT withdrawals with increased Maximum Limit if set as \"true\". To use this parameter, the application must support \"Partially successful\" withdrawal stat…","example":"false"},
  {"name":"customerIp","type":"string","required":false,"description":"End-customer IP address forwarded to the fiat provider for antifraud checks before the withdrawal is processed. ⚠️ Required if currency ticker is USD or EUR with VISAMASTER prov…","example":"203.0.113.42"},
  {"name":"bankBic","type":"string","required":false,"description":"Beneficiary bank's BIC (SWIFT) code, identifying the destination bank for SEPA and other bank-rail fiat withdrawals. ⚠️ Required if the fiat provider is one of: SEPA, SEPA_CLEAR…","example":"DEUTDEFF"},
  {"name":"beneficiary","type":"object","required":false,"description":"Beneficiary information. ⚠️ Required if currency ticker is one of: UAH_IBAN, USD_VISAMASTER, EUR_VISAMASTER, USD, EUR. Per-field requirements vary by currency and provider. Card…"},
  {"name":"travelRule","type":"object","required":false,"description":"Travel Rule information for regulatory compliance. ⚠️ Required if currency is crypto and the account is from EEA See Travel Rule Overview for complete documentation. **Legacy fo…"},
  {"name":"paymentDescription","type":"string","required":false,"description":"Description of withdrawal destination ⚠️ Required if currency is crypto and withdrawal from whitebit-tr.com","example":"Payment description"},
];
