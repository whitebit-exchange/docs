// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_market_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderMarketPlaceRequest, channelMeta, exOrderMarketPlaceRequest } from '/snippets/ws-data/order_market_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderMarketPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_market_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderMarketPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size. Stock on a sell, money to spend on a buy. Validated against the market minimum amount and minimum notional using the opposite side best price." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const orderMarketPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Executed order. Returns the standard order object with `price` `\"0\"`, because a market order carries no limit price. A spot market order reports `type` `2`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place market order", send: "order_market_place", receive: "Executed order object (status FILLED)", push: null },
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
      "code": 10,
      "message": "balance not enough",
      "description": "The available spot balance does not cover the order."
    },
    {
      "code": 11,
      "message": "amount too small",
      "description": "The order is below the market `minAmount` or `minTotal`, measured against the opposite side best price."
    },
    {
      "code": 12,
      "message": "not enough traders",
      "description": "The order book is empty or too thin to execute any part of the order."
    },
    {
      "code": 42,
      "message": "order slippage threshold",
      "description": "The slippage guard stopped the order before it consumed the book further."
    },
    {
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading is suspended, or the market runs in post-only mode — a market order is rejected there."
    },
    {
      "code": 601,
      "message": "account is restricted from trading",
      "description": "An account-level restriction blocks trading."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderMarketPlaceRequest = {
  "id": 500003,
  "method": "order_market_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "sell",
      "amount": "0.00108",
      "stp": "no"
    }
  ]
};

export const exOrderMarketPlaceResponse = {
  "id": 500003,
  "result": {
    "id": 2423735871141,
    "market": "ETH_USDT",
    "type": 2,
    "side": 1,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452690.129261,
    "mtime": 1786452690.129261,
    "price": "0",
    "amount": "0.00108",
    "left": "0",
    "deal_stock": "0.00108",
    "deal_money": "2.0391048",
    "deal_fee": "0.0040782096",
    "client_order_id": "",
    "stp": "no",
    "status": "FILLED"
  },
  "error": null
};
