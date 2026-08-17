// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_limit_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderLimitPlaceRequest, channelMeta, exOrderLimitPlaceRequest } from '/snippets/ws-data/order_limit_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderLimitPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_limit_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderLimitPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision. Must clear both `minAmount` and `minTotal`." },
  { name: "price", type: "string", required: true, description: "Limit price in money, at the market money precision. Validated against the maker and taker price bands for the given side." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on every response for the order. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
  { name: "post_only", type: "boolean", description: "Reject the order instead of taking liquidity. Cannot be combined with `ioc`." },
  { name: "ioc", type: "boolean", description: "Immediate-or-cancel — cancel the unmatched remainder instead of resting it. Cannot be combined with `post_only` or `rpi`." },
  { name: "rpi", type: "boolean", description: "Retail Price Improvement order. Implies `post_only`; cannot be combined with `ioc`." },
];

export const orderLimitPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted order. Returns the standard order object. A limit order reports `type` `1`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place limit order", send: "order_limit_place", receive: "Accepted order object (status OPEN)", push: null },
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
      "code": 1,
      "message": "invalid argument",
      "description": "A required parameter is missing, an enum value is invalid, or the execution flags conflict. The message names the offending field. `ioc` cannot be combined with `post_only` or `rpi`."
    },
    {
      "code": 10,
      "message": "balance not enough",
      "description": "The available spot balance does not cover the order."
    },
    {
      "code": 11,
      "message": "amount too small",
      "description": "The order is below the market `minAmount` or `minTotal`. Check both via `GET /api/v4/public/markets`."
    },
    {
      "code": 12,
      "message": "not enough traders",
      "description": "The order book is too thin to execute the order."
    },
    {
      "code": 13,
      "message": "order by taker price",
      "description": "A post-only order would cross the spread and take liquidity. Lower the price for a buy, or raise it for a sell."
    },
    {
      "code": 40,
      "message": "order is not post only",
      "description": "The market is in post-only mode and the order does not carry the post-only flag."
    },
    {
      "code": 41,
      "message": "order is not ioc",
      "description": "The market requires immediate-or-cancel orders."
    },
    {
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading on the market is suspended, or the market status blocks this method."
    },
    {
      "code": 154,
      "message": "price is outside spread",
      "description": "The price falls outside the allowed spread."
    },
    {
      "code": 250,
      "message": "price must be >= X / <= Y",
      "description": "The price falls outside the market price band. The message states the accepted boundary."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderLimitPlaceRequest = {
  "id": 500002,
  "method": "order_limit_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "buy",
      "amount": "0.00108",
      "price": "1859.75",
      "stp": "no"
    }
  ]
};

export const exOrderLimitPlaceResponse = {
  "id": 500002,
  "result": {
    "id": 2423735868673,
    "market": "ETH_USDT",
    "type": 1,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452689.828402,
    "mtime": 1786452689.828402,
    "price": "1859.75",
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
