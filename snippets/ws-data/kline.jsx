// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/kline.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { candle, exOrdersPendingRequest } from '/snippets/ws-data/kline'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const candlesRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters:\n- [0] Market name (e.g., ETH_BTC)\n- [1] Start time (Unix timestamp)\n- [2] End time (Unix timestamp)\n- [3] Interval in seconds" },
];

export const candlesResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "array", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const candlesSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `candles_subscribe`." },
  { name: "params", type: "array", required: true, description: "Subscription parameters:\n- [0] Market name (e.g., BTC_USD)\n- [1] Interval in seconds" },
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
