// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/balance_spot.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { balanceSpotRequest, exBalanceSpotRequest } from '/snippets/ws-data/balance_spot.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const balanceSpotRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceSpot_request`." },
  { name: "params", type: "array", required: true, description: "Array of asset tickers to query. Empty array returns all balances." },
];

export const balanceSpotResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Wallet balances by currency" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const balanceSpotSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceSpot_subscribe`." },
  { name: "params", type: "array", required: true, description: "Array of asset tickers to subscribe to" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const balanceSpotUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceSpot_update`." },
  { name: "params", type: "array", required: true, description: "Array containing balance updates for subscribed assets" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `balanceSpot_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exBalanceSpotRequest = {
  "id": 2,
  "method": "balanceSpot_request",
  "params": [
    "ETH",
    "BTC"
  ]
};

export const exBalanceSpotResponse = {
  "id": 2,
  "result": {
    "ETH": {
      "available": "0",
      "freeze": "0"
    },
    "BTC": {
      "available": "0",
      "freeze": "0"
    }
  },
  "error": null
};

export const exBalanceSpotSubscribe = {
  "id": 3,
  "method": "balanceSpot_subscribe",
  "params": [
    "USDT",
    "ETH"
  ]
};

export const exBalanceSpotSubscribeResponse = {
  "id": 3,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exBalanceSpotUpdate = {
  "id": null,
  "method": "balanceSpot_update",
  "params": [
    {
      "USDT": {
        "available": "100.1885",
        "freeze": "0"
      }
    }
  ]
};

export const exBalanceSpotUnsubscribe = {
  "id": 4,
  "method": "balanceSpot_unsubscribe",
  "params": []
};

export const exBalanceSpotUnsubscribeResponse = {
  "id": 4,
  "result": {
    "status": "success"
  },
  "error": null
};
