// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/market_today.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { marketTodayStatistics, exMarketTodayRequest } from '/snippets/ws-data/market_today.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const marketTodayStatistics = [
  { name: "last", type: "string", required: true, description: "Last price" },
  { name: "open", type: "string", required: true, description: "Open price at today's start (UTC midnight)" },
  { name: "high", type: "string", required: true, description: "Highest price today" },
  { name: "low", type: "string", required: true, description: "Lowest price today" },
  { name: "volume", type: "string", required: true, description: "Volume in stock currency" },
  { name: "deal", type: "string", required: true, description: "Volume in money currency" },
];

export const marketTodayRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `marketToday_query`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const marketTodayResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const marketTodaySubscribe = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `marketToday_subscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const marketTodayUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `marketToday_update`." },
  { name: "params", type: "array", required: true, description: "Update event parameters:\n- [0] Market name\n- [1] MarketTodayStatistics object" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `marketToday_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Query", send: "marketToday_query", receive: "Market statistics for current day UTC", push: null },
  { name: "Subscribe", send: "marketToday_subscribe", receive: "Confirmation (status: success)", push: "marketToday_update — periodic market today statistics update (every 1 second)" },
  { name: "Unsubscribe", send: "marketToday_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exMarketTodayRequest = {
  "id": 14,
  "method": "marketToday_query",
  "params": [
    "ETH_BTC"
  ]
};

export const exMarketTodayResponse = {
  "id": 14,
  "result": {
    "last": "0.020981",
    "open": "0.02035",
    "high": "0.020988",
    "low": "0.020281",
    "volume": "135220.218",
    "deal": "2776.587022649"
  },
  "error": null
};

export const exMarketTodaySubscribe = {
  "id": 15,
  "method": "marketToday_subscribe",
  "params": [
    "ETH_BTC",
    "BTC_USDT"
  ]
};

export const exMarketTodayUpdate = {
  "id": null,
  "method": "marketToday_update",
  "params": [
    "ETH_BTC",
    {
      "last": "0.020964",
      "open": "0.020349",
      "high": "0.020997",
      "low": "0.020281",
      "volume": "135574.476",
      "deal": "2784.413999488"
    }
  ]
};
