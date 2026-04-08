// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/book_ticker.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { bookTickerSubscribe, exSubscribeSpecificMarket } from '/snippets/ws-data/book_ticker.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const bookTickerSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `bookTicker_subscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const bookTickerUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `bookTicker_update`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `bookTicker_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const bookTickerUpdateDataTupleFields = [
  { index: 0, field: "transaction_time", type: "number", description: "Unix timestamp from matching engine" },
  { index: 1, field: "message_time", type: "number", description: "Unix timestamp from WebSocket" },
  { index: 2, field: "market", type: "string", description: "Market name" },
  { index: 3, field: "update_id", type: "integer", description: "Monotonic update counter" },
  { index: 4, field: "best_bid_price", type: "string", description: "Current best bid price" },
  { index: 5, field: "best_bid_amount", type: "string", description: "Current best bid quantity" },
  { index: 6, field: "best_ask_price", type: "string", description: "Current best ask price" },
  { index: 7, field: "best_ask_amount", type: "string", description: "Current best ask quantity" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "bookTicker_subscribe", receive: "Confirmation (status: success)", push: "bookTicker_update — best bid/ask snapshot on change" },
  { name: "Unsubscribe", send: "bookTicker_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exSubscribeSpecificMarket = {
  "id": 1,
  "method": "bookTicker_subscribe",
  "params": [
    "SHIB_PERP"
  ]
};

export const exSubscribeAllMarkets = {
  "id": 1,
  "method": "bookTicker_subscribe",
  "params": []
};

export const exBookTickerSubscribeResponse = {
  "id": 1,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exBookTickerUpdate = {
  "id": null,
  "method": "bookTicker_update",
  "params": [
    [
      1751958383.593387,
      1751958383.593557,
      "SHIB_PERP",
      80670102,
      "0.000011751",
      "12547000",
      "0.000011776",
      "17424000"
    ]
  ]
};

export const exBookTickerUnsubscribe = {
  "id": 2,
  "method": "bookTicker_unsubscribe",
  "params": []
};
