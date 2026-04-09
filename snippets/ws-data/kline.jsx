// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/kline.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { candlesRequest, channelMeta, exCandlesRequest } from '/snippets/ws-data/kline.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const candlesRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters:\n- [0] Market name (STRING, e.g., ETH_BTC)\n- [1] Start time (INTEGER, Unix timestamp)\n- [2] End time (INTEGER, Unix timestamp)\n- [3] Interval in seconds (INTEGER, see interval constraints)" },
];

export const candlesResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "array", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const candlesSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_subscribe`." },
  { name: "params", type: "array", required: true, description: "Subscription parameters:\n- [0] Market name (STRING, e.g., BTC_USD)\n- [1] Interval in seconds (INTEGER, see interval constraints)" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const candlesUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_update`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const candleTupleFields = [
  { index: 0, field: "time", type: "integer", description: "Candle open time (Unix timestamp)" },
  { index: 1, field: "open", type: "string", description: "Open price" },
  { index: 2, field: "close", type: "string", description: "Close price (current price for live candle)" },
  { index: 3, field: "high", type: "string", description: "Highest price in the interval" },
  { index: 4, field: "low", type: "string", description: "Lowest price in the interval" },
  { index: 5, field: "volume", type: "string", description: "Volume in stock (base currency)" },
  { index: 6, field: "deal", type: "string", description: "Volume in money (quote currency)" },
  { index: 7, field: "market", type: "string", description: "Market name" },
];

export const candlesRequestParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name (e.g., ETH_BTC)", required: true, example: "ETH_BTC" },
  { index: 1, field: "start_time", type: "integer", description: "Start time (Unix timestamp)", required: true, example: "1659569940" },
  { index: 2, field: "end_time", type: "integer", description: "End time (Unix timestamp)", required: true, example: "1660894800" },
  { index: 3, field: "interval", type: "integer", description: "Interval in seconds", required: true, example: "3600" },
];

export const candlesSubscribeParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name (e.g., BTC_USD)", required: true, example: "BTC_USD" },
  { index: 1, field: "interval", type: "integer", description: "Interval in seconds", required: true, example: "900" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Query", send: "candles_request", receive: "Array of candlestick records", push: null },
  { name: "Subscribe", send: "candles_subscribe", receive: "Confirmation (status: success)", push: "candles_update — periodic candlestick update (every 0.5 seconds)" },
  { name: "Unsubscribe", send: "candles_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": false,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPerMinute": 200
  },
  "errorCodes": "standard"
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCandlesRequest = {
  "id": 2,
  "method": "candles_request",
  "params": [
    "ETH_BTC",
    1659569940,
    1660894800,
    3600
  ]
};

export const exCandlesResponse = {
  "id": 2,
  "result": [
    [
      1580860800,
      "0.020543",
      "0.020553",
      "0.020614",
      "0.02054",
      "7342.597",
      "151.095481849",
      "ETH_BTC"
    ]
  ],
  "error": null
};

export const exCandlesSubscribe = {
  "id": 3,
  "method": "candles_subscribe",
  "params": [
    "BTC_USD",
    900
  ]
};

export const exCandlesSubscribeResponse = {
  "id": 3,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exCandlesUpdate = {
  "id": null,
  "method": "candles_update",
  "params": [
    [
      1580895000,
      "0.020683",
      "0.020683",
      "0.020683",
      "0.020666",
      "504.701",
      "10.433600491",
      "ETH_BTC"
    ]
  ]
};

export const exCandlesUnsubscribe = {
  "id": 4,
  "method": "candles_unsubscribe",
  "params": []
};
