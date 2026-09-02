// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_cancel.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderCancelRequest, channelMeta, exOrderCancelRequest } from '/snippets/ws-data/order_cancel.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderCancelRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_cancel`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one parameter object" },
];

export const orderCancelParams = [
  { name: "market", type: "string", required: true, description: "Market the order lives on. Required even when the order id is unambiguous, because it routes the call." },
  { name: "order_id", type: "integer", description: "Engine order id. Supply this or `client_order_id`." },
  { name: "client_order_id", type: "string", description: "Client order id. Takes precedence when both identifiers are supplied. The response still reports the engine id, which confirms which order was canceled." },
];

export const orderCancelResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Canceled order as a standard order object with `status` `CANCELED`. The `mtime` field advances to the cancellation time while `ctime` stays at placement." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Cancel order", send: "order_cancel", receive: "Canceled order object (status CANCELED)", push: null },
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
      "code": 6,
      "message": "order not found",
      "description": "The order id is unknown, the order already finished, or a group id was passed. Cancel OCO and OTO groups with `order_cancel_conditional`."
    },
    {
      "code": 1,
      "message": "order_id or client_order_id must be set for modify",
      "description": "Neither identifier was supplied. The same message covers this method."
    },
    {
      "code": 1,
      "message": "market does not exist",
      "description": "The market name is unknown."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderCancelRequest = {
  "id": 500020,
  "method": "order_cancel",
  "params": [
    {
      "market": "ETH_USDT",
      "order_id": 2423735868673
    }
  ]
};

export const exOrderCancelResponse = {
  "id": 500020,
  "result": {
    "id": 2423735868673,
    "market": "ETH_USDT",
    "type": 1,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452689.828402,
    "mtime": 1786452689.864344,
    "price": "1859.75",
    "amount": "0.00108",
    "left": "0.00108",
    "deal_stock": "0",
    "deal_money": "0",
    "deal_fee": "0",
    "client_order_id": "",
    "stp": "no",
    "status": "CANCELED"
  },
  "error": null
};
