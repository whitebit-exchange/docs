// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/market.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { marketStatistics, exMarketRequest } from '/snippets/ws-data/market.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const marketStatistics = [
  { name: "period", type: "integer", required: true, description: "Period in seconds" },
  { name: "last", type: "string", required: true, description: "Last price" },
  { name: "open", type: "string", required: true, description: "Open price at 'now - period' time" },
  { name: "close", type: "string", required: true, description: "Closing price for the period" },
  { name: "high", type: "string", required: true, description: "Highest price in the period" },
  { name: "low", type: "string", required: true, description: "Lowest price in the period" },
  { name: "volume", type: "string", required: true, description: "Volume in stock currency" },
  { name: "deal", type: "string", required: true, description: "Volume in money currency" },
];

export const marketRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `market_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters:\n- [0] Market name (STRING)\n- [1] Period in seconds (INTEGER)" },
];

export const marketResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const marketSubscribe = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `market_subscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const marketUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `market_update`." },
  { name: "params", type: "array", required: true, description: "Update event parameters:\n- [0] Market name\n- [1] MarketStatistics object" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `market_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Query", send: "market_request", receive: "Market statistics for the requested period", push: null },
  { name: "Subscribe", send: "market_subscribe", receive: "Confirmation (status: success)", push: "market_update — updated 24h statistics" },
  { name: "Unsubscribe", send: "market_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exMarketRequest = {
  "id": 5,
  "method": "market_request",
  "params": [
    "ETH_BTC",
    86400
  ]
};

export const exMarketResponse = {
  "id": 5,
  "result": {
    "period": 86400,
    "last": "0.020981",
    "open": "0.02035",
    "close": "0.020981",
    "high": "0.020988",
    "low": "0.020281",
    "volume": "135220.218",
    "deal": "2776.587022649"
  },
  "error": null
};

export const exMarketSubscribe = {
  "id": 6,
  "method": "market_subscribe",
  "params": [
    "ETH_BTC",
    "BTC_USDT"
  ]
};

export const exMarketUpdate = {
  "id": null,
  "method": "market_update",
  "params": [
    "ETH_BTC",
    {
      "period": 86400,
      "last": "0.020964",
      "open": "0.020349",
      "close": "0.020964",
      "high": "0.020997",
      "low": "0.020281",
      "volume": "135574.476",
      "deal": "2784.413999488"
    }
  ]
};
