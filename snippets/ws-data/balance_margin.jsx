// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/balance_margin.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { balanceMarginRequest, exBalanceMarginRequest } from '/snippets/ws-data/balance_margin.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const balanceMarginRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceMargin_request`." },
  { name: "params", type: "array", required: true, description: "Array of asset tickers to query" },
];

export const balanceMarginResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Margin balances by currency" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const balanceMarginSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceMargin_subscribe`." },
  { name: "params", type: "array", required: true, description: "Array of asset tickers to subscribe to" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const balanceMarginUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceMargin_update`." },
  { name: "params", type: "array", required: true, description: "Array containing margin balance updates with abbreviated field names" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exBalanceMarginRequest = {
  "id": 2,
  "method": "balanceMargin_request",
  "params": [
    "BTC",
    "USDT"
  ]
};

export const exBalanceMarginResponse = {
  "error": null,
  "result": {
    "BTC": {
      "balance": "0.0006092",
      "borrow": "0",
      "available_without_borrow": "0.0006092",
      "available_with_borrow": "0.00288701"
    },
    "USDT": {
      "balance": "0.00538073",
      "borrow": "0",
      "available_without_borrow": "0.00538073",
      "available_with_borrow": "28.43739825"
    }
  },
  "id": 1
};

export const exBalanceMarginSubscribe = {
  "id": 3,
  "method": "balanceMargin_subscribe",
  "params": [
    "BTC",
    "USDT"
  ]
};

export const exBalanceMarginSubscribeResponse = {
  "id": 3,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exBalanceMarginUpdate = {
  "method": "balanceMargin_update",
  "params": [
    {
      "a": "BTC",
      "B": "0.0006092",
      "b": "0",
      "av": "0.0006092",
      "ab": "0.00288701"
    },
    {
      "a": "USDT",
      "B": "0.00538073",
      "b": "0",
      "av": "0.00538073",
      "ab": "28.43739825"
    }
  ],
  "id": null
};

export const exBalanceMarginUnsubscribe = {
  "id": 4,
  "method": "balanceMargin_unsubscribe",
  "params": []
};

export const exBalanceMarginUnsubscribeResponse = {
  "id": 4,
  "result": {
    "status": "success"
  },
  "error": null
};
