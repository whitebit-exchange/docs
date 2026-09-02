// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_cancel_all.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderCancelAllRequest, channelMeta, exOrderCancelAllRequest } from '/snippets/ws-data/order_cancel_all.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderCancelAllRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_cancel_all`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one parameter object" },
];

export const orderCancelAllParams = [
  { name: "market", type: "string", required: true, description: "Market to clear. One market per call." },
  { name: "type", type: "array", required: true, description: "Which order kinds to cancel — any non-empty combination of `spot`, `margin`, and `futures`. An empty array or a duplicate entry returns error `1`. Passing all three is safe on any market, because types that do not apply are simply not matched." },
];

export const orderCancelAllResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Empty object. No list of canceled orders is returned, and nothing matched is not an error — re-query pending orders to confirm the outcome." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Cancel all orders", send: "order_cancel_all", receive: "Empty result object", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": true,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPer10Seconds": 12000
  },
  "errorCodes": [
    {
      "code": 1,
      "message": "order types must be an array",
      "description": "The `type` parameter is not an array."
    },
    {
      "code": 1,
      "message": "at least one order type should be specified",
      "description": "The `type` array is empty."
    },
    {
      "code": 1,
      "message": "invalid or duplicate order type",
      "description": "The `type` array holds an unknown value or a repeated entry."
    },
    {
      "code": 1,
      "message": "market does not exist",
      "description": "The market name is unknown."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderCancelAllRequest = {
  "id": 500085,
  "method": "order_cancel_all",
  "params": [
    {
      "market": "ETH_USDT",
      "type": [
        "spot",
        "futures",
        "margin"
      ]
    }
  ]
};

export const exOrderCancelAllResponse = {
  "id": 500085,
  "result": {},
  "error": null
};
