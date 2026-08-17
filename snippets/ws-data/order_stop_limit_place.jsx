// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_stop_limit_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderStopLimitPlaceRequest, channelMeta, exOrderStopLimitPlaceRequest } from '/snippets/ws-data/order_stop_limit_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderStopLimitPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_stop_limit_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderStopLimitPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price. The engine compares it to the current market to derive `activation_condition` — `gte` when above the market, `lte` when below. It must differ from the last price, otherwise error `101` is returned." },
  { name: "price", type: "string", required: true, description: "Limit price of the order placed on activation. Independent of the trigger price." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const orderStopLimitPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order. Adds `activation_price`, `activation_condition`, and `activated` to the standard order object. Reports `type` `3` and `activated` `0` until the trigger fires." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place stop-limit order", send: "order_stop_limit_place", receive: "Accepted conditional order (status OPEN, not activated)", push: null },
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
      "code": 101,
      "message": "activation price should not be equal to the last price",
      "description": "The activation price equals the current last price. Move the trigger to either side of it."
    },
    {
      "code": 158,
      "message": "wrong activation price for limit order",
      "description": "The trigger price and the limit price are inconsistent."
    },
    {
      "code": 250,
      "message": "price must be >= X / <= Y",
      "description": "The limit price falls outside the market price band. The message states the accepted boundary."
    },
    {
      "code": 251,
      "message": "activation price is out of bands",
      "description": "The activation price falls outside the maker price bands."
    },
    {
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading is suspended, or the market runs in post-only mode — a stop method is rejected there."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderStopLimitPlaceRequest = {
  "id": 500005,
  "method": "order_stop_limit_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "sell",
      "amount": "0.00108",
      "price": "1831.41",
      "activation_price": "1859.73",
      "stp": "no"
    }
  ]
};

export const exOrderStopLimitPlaceResponse = {
  "id": 500005,
  "result": {
    "id": 2423735873475,
    "market": "ETH_USDT",
    "type": 3,
    "side": 1,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452690.462755,
    "mtime": 1786452690.462755,
    "activation_price": "1859.73",
    "activation_condition": "lte",
    "activated": 0,
    "price": "1831.41",
    "amount": "0.00108",
    "left": "0.00108",
    "deal_stock": "0",
    "deal_money": "0",
    "deal_fee": "0",
    "client_order_id": "",
    "stp": "no",
    "status": "OPEN"
  },
  "error": null
};
