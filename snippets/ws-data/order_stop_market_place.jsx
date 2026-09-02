// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_stop_market_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderStopMarketPlaceRequest, channelMeta, exOrderStopMarketPlaceRequest } from '/snippets/ws-data/order_stop_market_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderStopMarketPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_stop_market_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderStopMarketPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size. Money on a buy, stock on a sell." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price, validated against the market price bands. Outside them the call returns error `251`." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const orderStopMarketPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order with `price` `\"0\"`, because the order created on activation carries no limit price. Reports `type` `4`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place stop-market order", send: "order_stop_market_place", receive: "Accepted conditional order (status OPEN, not activated)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": true,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "orderPlacementsPer10Seconds": 10000
  },
  "errorCodes": [
    {
      "code": 101,
      "message": "activation price should not be equal to the last price",
      "description": "The activation price equals the current last price. Move the trigger to either side of it."
    },
    {
      "code": 251,
      "message": "activation price is out of bands",
      "description": "The activation price falls outside the market price bands."
    },
    {
      "code": 159,
      "message": "wrong limit price for stop market order",
      "description": "The trigger price is inconsistent with the resulting market order."
    },
    {
      "code": 42,
      "message": "order slippage threshold",
      "description": "The slippage guard stopped the order created on activation."
    },
    {
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading is suspended, or the market runs in post-only mode — a stop method is rejected there."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderStopMarketPlaceRequest = {
  "id": 500006,
  "method": "order_stop_market_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "buy",
      "amount": "3.00",
      "activation_price": "1916.38",
      "stp": "no"
    }
  ]
};

export const exOrderStopMarketPlaceResponse = {
  "id": 500006,
  "result": {
    "id": 2423735874404,
    "market": "ETH_USDT",
    "type": 4,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452690.574345,
    "mtime": 1786452690.574345,
    "activation_price": "1916.38",
    "activation_condition": "gte",
    "activated": 0,
    "price": "0",
    "amount": "3",
    "left": "3",
    "deal_stock": "0",
    "deal_money": "0",
    "deal_fee": "0",
    "client_order_id": "",
    "stp": "no",
    "status": "OPEN"
  },
  "error": null
};
