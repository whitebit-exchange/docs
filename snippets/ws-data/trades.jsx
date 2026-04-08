// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/trades.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { trade, exTradesRequest } from '/snippets/ws-data/trades.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const trade = [
  { name: "id", type: "integer", required: true, description: "Trade ID" },
  { name: "time", type: "number", required: true, description: "Trade time (Unix timestamp with milliseconds)" },
  { name: "price", type: "string", required: true, description: "Trade price" },
  { name: "amount", type: "string", required: true, description: "Trade amount" },
  { name: "type", type: "string", required: true, enum: ["buy","sell"], description: "Trade type (buy/sell)" },
  { name: "rpi", type: "boolean", description: "Indicates whether the trade involved a Retail Price Improvement (RPI) order" },
];

export const tradesRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `trades_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters:\n- [0] Market name (STRING)\n- [1] Limit — number of trades to return (INTEGER, max 100)\n- [2] Largest trade ID to request from (INTEGER, use 0 for latest)" },
];

export const tradesResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "array", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const tradesSubscribe = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `trades_subscribe`." },
  { name: "params", type: "array", required: true, description: "Market names (empty array to subscribe to all markets)" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const tradesUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `trades_update`." },
  { name: "params", type: "array", required: true, description: "Update event parameters:\n- [0] Market name\n- [1] Array of Trade objects" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `trades_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exTradesRequest = {
  "id": 8,
  "method": "trades_request",
  "params": [
    "ETH_BTC",
    100,
    41358445
  ]
};

export const exTradesResponse = {
  "id": 8,
  "result": [
    {
      "id": 41358530,
      "time": 1580905394.70332,
      "price": "0.020857",
      "amount": "5.511",
      "type": "sell",
      "rpi": false
    }
  ],
  "error": null
};

export const exSubscribeSpecificMarkets = {
  "id": 9,
  "method": "trades_subscribe",
  "params": [
    "ETH_BTC",
    "BTC_USDT"
  ]
};

export const exSubscribeAllMarkets = {
  "id": 9,
  "method": "trades_subscribe",
  "params": []
};

export const exTradesUpdate = {
  "id": null,
  "method": "trades_update",
  "params": [
    "ETH_BTC",
    [
      {
        "id": 41358530,
        "time": 1580905394.70332,
        "price": "0.020857",
        "amount": "5.511",
        "type": "sell",
        "rpi": true
      }
    ]
  ]
};
