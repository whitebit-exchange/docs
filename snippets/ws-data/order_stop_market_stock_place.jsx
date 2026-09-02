// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_stop_market_stock_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderStopMarketStockPlaceRequest, channelMeta, exOrderStopMarketStockPlaceRequest } from '/snippets/ws-data/order_stop_market_stock_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderStopMarketStockPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_stop_market_stock_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderStopMarketStockPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock on both sides, at the market stock precision." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price, validated against the market price bands. Outside them the call returns error `251`." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const orderStopMarketStockPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order with `price` `\"0\"`. Reports `type` `203`, the stock-denominated stop-market code." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place stop-market order in stock", send: "order_stop_market_stock_place", receive: "Accepted conditional order (status OPEN, not activated)", push: null },
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
      "code": 10,
      "message": "balance not enough",
      "description": "On a buy the engine spends money at activation, so the balance must cover the amount multiplied by the best ask, plus fee."
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

export const exOrderStopMarketStockPlaceRequest = {
  "id": 500007,
  "method": "order_stop_market_stock_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "sell",
      "amount": "0.00108",
      "activation_price": "1859.73",
      "stp": "no"
    }
  ]
};

export const exOrderStopMarketStockPlaceResponse = {
  "id": 500007,
  "result": {
    "id": 2423735877172,
    "market": "ETH_USDT",
    "type": 203,
    "side": 1,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452690.913759,
    "mtime": 1786452690.913759,
    "activation_price": "1859.73",
    "activation_condition": "lte",
    "activated": 0,
    "price": "0",
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
