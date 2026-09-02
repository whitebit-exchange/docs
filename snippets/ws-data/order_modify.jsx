// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_modify.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderModifyRequest, channelMeta, exOrderModifyRequest } from '/snippets/ws-data/order_modify.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderModifyRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_modify`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one parameter object" },
];

export const orderModifyParams = [
  { name: "market", type: "string", required: true, description: "Market the order lives on. Required even when the order id is unambiguous, because it routes the call." },
  { name: "order_id", type: "integer", description: "Engine order id. Supply this or `client_order_id`." },
  { name: "client_order_id", type: "string", description: "Client order id. Preserved on the replacement order, so it keeps pointing at the live order. Supply this or `order_id`." },
  { name: "amount", type: "string", description: "New size in stock. Mutually exclusive with `total`." },
  { name: "total", type: "string", description: "New size expressed in money. Mutually exclusive with `amount`." },
  { name: "price", type: "string", description: "New limit price." },
  { name: "activation_price", type: "string", description: "New trigger price, for conditional orders." },
];

export const orderModifyResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Replacement order as a standard order object, carrying a new `id` and a fresh `ctime`. Omitted parameters keep their previous values." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Modify order", send: "order_modify", receive: "Replacement order with a new id", push: null },
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
      "description": "The order id is unknown, or the order already finished."
    },
    {
      "code": 1,
      "message": "order_id or client_order_id must be set for modify",
      "description": "Neither identifier was supplied."
    },
    {
      "code": 1,
      "message": "at least price or amount or total or activation price should be specified",
      "description": "The request changes nothing."
    },
    {
      "code": 1,
      "message": "amount and total cannot be specified simultaneously",
      "description": "The `amount` and `total` parameters are mutually exclusive."
    },
    {
      "code": 155,
      "message": "conditional order modification",
      "description": "The target is an OCO or OTO leg. Cancel the group and place a new one instead."
    },
    {
      "code": 160,
      "message": "tpsl order modification",
      "description": "The target is a TPSL leg. Cancel the leg and attach a new pair instead."
    },
    {
      "code": 156,
      "message": "wrong order type",
      "description": "The order type cannot be modified."
    },
    {
      "code": 162,
      "message": "wrong param total",
      "description": "The new `total` value is invalid. Errors `163` and `164` cover `amount` and `price`."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderModifyRequest = {
  "id": 500019,
  "method": "order_modify",
  "params": [
    {
      "market": "ETH_USDT",
      "order_id": 2423735905491,
      "amount": "0.00216",
      "price": "1831.41"
    }
  ]
};

export const exOrderModifyResponse = {
  "id": 500019,
  "result": {
    "id": 2423735905695,
    "market": "ETH_USDT",
    "type": 1,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452694.062384,
    "mtime": 1786452694.062384,
    "price": "1831.41",
    "amount": "0.00216",
    "left": "0.00216",
    "deal_stock": "0",
    "deal_money": "0",
    "deal_fee": "0",
    "client_order_id": "",
    "stp": "no",
    "status": "OPEN"
  },
  "error": null
};
