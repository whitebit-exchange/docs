// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_cancel_conditional.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderCancelConditionalRequest, channelMeta, exOrderCancelConditionalRequest } from '/snippets/ws-data/order_cancel_conditional.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderCancelConditionalRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_cancel_conditional`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one parameter object" },
];

export const orderCancelConditionalParams = [
  { name: "market", type: "string", required: true, description: "Market the group lives on." },
  { name: "order_id", type: "integer", required: true, description: "Group id — the top-level `id` from the OCO or OTO placement response, not a leg id. No `client_order_id` form exists for this method." },
];

export const orderCancelConditionalResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Group object mirroring the placement response — same `type` value, `\"oco\"` or `\"oto\"` — with every leg reporting `status` `CANCELED`. All legs share one `mtime`, because the cancellation is a single atomic event." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Cancel conditional group", send: "order_cancel_conditional", receive: "Group object with every leg CANCELED", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": true,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPerMinute": 200
  },
  "errorCodes": [
    {
      "code": 6,
      "message": "order not found",
      "description": "The id is unknown, the group already finished, or the id belongs to a plain stop order or a TPSL leg. Cancel those with `order_cancel`."
    },
    {
      "code": 1,
      "message": "invalid argument",
      "description": "The `order_id` parameter is missing. This method has no `client_order_id` form."
    },
    {
      "code": 19,
      "message": "market is not margin market",
      "description": "Groups exist on margin and futures markets only."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderCancelConditionalRequest = {
  "id": 500021,
  "method": "order_cancel_conditional",
  "params": [
    {
      "market": "BTC_PERP",
      "order_id": 2423735892717
    }
  ]
};

export const exOrderCancelConditionalResponse = {
  "id": 500021,
  "result": {
    "type": "oco",
    "id": 2423735892717,
    "stop_loss": {
      "id": 2423735892718,
      "type": 9,
      "activation_price": "63370.99",
      "price": "62405.95",
      "mtime": 1786452692.76295,
      "status": "CANCELED"
    },
    "take_profit": {
      "id": 2423735892719,
      "type": 7,
      "price": "65301.08",
      "mtime": 1786452692.76295,
      "status": "CANCELED"
    }
  },
  "error": null
};
