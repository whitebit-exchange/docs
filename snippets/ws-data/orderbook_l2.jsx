// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/orderbook_l2.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderbookL2Subscribe, channelMeta, exOrderbookL2Subscribe } from '/snippets/ws-data/orderbook_l2.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderbookL2Subscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `orderbook_l2.subscribe`." },
  { name: "params", type: "array", required: true, description: "Subscription parameters:\n- [0] Market name\n- [1] Limit — order book depth per side (1, 5, 10, 50, 100, 500, or 1000)\n- [2] Multiple subscription flag (optional, default false)" },
];

export const statusResponse = [
  { name: "id", type: "integer", required: true, description: "Identifier of the original request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const orderbookL2Update = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `orderbook_l2.update`." },
  { name: "params", type: "any", required: true, description: "Snapshot (first message after subscription) or incremental update.\n- Snapshot: a flat tuple, `params[0]` is the string `\"s\"`.\n- Update: an array of one or two update records, `params[0]` is an array." },
];

export const orderbookL2Unsubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `orderbook_l2.unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array unsubscribes from all markets; a single market name unsubscribes from that market only." },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const orderbookL2SubscribeParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name", required: true, example: "BTC_USDT" },
  { index: 1, field: "limit", type: "integer", description: "Order book depth per side. The client keeps only this many best levels per side after each message.", required: true, example: "1000", enum: [1,5,10,50,100,500,1000] },
  { index: 2, field: "multiple_subscription", type: "boolean", description: "Multiple subscription flag. `true` adds the market to existing `orderbook_l2` subscriptions. `false` (the default when omitted) cancels all current `orderbook_l2` subscriptions and keeps only this one.", required: false, example: "true" },
];

export const orderbookL2SnapshotParamsTupleFields = [
  { index: 0, field: "type", type: "string", description: "Snapshot marker. Fixed value: `s`.", example: "s" },
  { index: 1, field: "timestamp", type: "number", description: "Unix time in seconds with fractional part", example: "1791809602.497162" },
  { index: 2, field: "market", type: "string", description: "Market name", example: "BTC_USDT" },
  { index: 3, field: "asks", type: "array", description: "Ask levels as `[price, amount]` tuples, sorted ascending by price. Depth is `limit` from the subscription." },
  { index: 4, field: "bids", type: "array", description: "Bid levels as `[price, amount]` tuples, sorted descending by price. Depth is `limit` from the subscription." },
];

export const orderbookL2UpdateRecordTupleFields = [
  { index: 0, field: "type", type: "string", description: "Update marker. Fixed value: `u`.", example: "u" },
  { index: 1, field: "timestamp", type: "number", description: "Unix time in seconds with fractional part", example: "1791809620.517216" },
  { index: 2, field: "market", type: "string", description: "Market name", example: "BTC_USDT" },
  { index: 3, field: "side", type: "string", description: "Order book side: `a` — ask (sell), `b` — bid (buy).", example: "a", enum: ["a","b"], enumLabels: {"a":"Ask","b":"Bid"} },
  { index: 4, field: "price", type: "string", description: "Price of the level", example: "82909.04" },
  { index: 5, field: "amount", type: "string", description: "New total amount at the level, in the base currency. This is an absolute value, not a delta. `\"0\"` removes the level.", example: "0.008509" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "orderbook_l2.subscribe", receive: "Confirmation (status: success)", push: "orderbook_l2.update — full snapshot (first), then incremental updates" },
  { name: "Unsubscribe", send: "orderbook_l2.unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": false,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPer10Seconds": 12000
  },
  "errorCodes": "standard"
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderbookL2Subscribe = {
  "id": 1234,
  "method": "orderbook_l2.subscribe",
  "params": [
    "BTC_USDT",
    1000,
    true
  ]
};

export const exOrderbookL2SubscribeResponse = {
  "id": 1234,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exOrderbookL2Snapshot = {
  "id": null,
  "method": "orderbook_l2.update",
  "params": [
    "s",
    1791809602.497162,
    "BTC_USDT",
    [
      [
        "82900.12",
        "0.034248"
      ],
      [
        "82905.5",
        "0.5"
      ]
    ],
    [
      [
        "82900.11",
        "0.1"
      ],
      [
        "82899.8",
        "0.25"
      ]
    ]
  ]
};

export const exOrderbookL2Update = {
  "id": null,
  "method": "orderbook_l2.update",
  "params": [
    [
      "u",
      1791809610.102933,
      "BTC_USDT",
      "b",
      "82900.11",
      "0.35"
    ]
  ]
};

export const exOrderbookL2DoubleUpdate = {
  "id": null,
  "method": "orderbook_l2.update",
  "params": [
    [
      "u",
      1791809620.517216,
      "BTC_USDT",
      "a",
      "82900.12",
      "0"
    ],
    [
      "u",
      1791809620.517216,
      "BTC_USDT",
      "a",
      "82909.04",
      "0.008509"
    ]
  ]
};

export const exOrderbookL2Unsubscribe = {
  "id": 1235,
  "method": "orderbook_l2.unsubscribe",
  "params": [
    "BTC_USDT"
  ]
};

export const exOrderbookL2UnsubscribeResponse = {
  "id": 1235,
  "result": {
    "status": "success"
  },
  "error": null
};
