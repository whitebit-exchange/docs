// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_limit_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderLimitPlaceRequest, channelMeta, exCollateralOrderLimitPlaceRequest } from '/snippets/ws-data/collateral_order_limit_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderLimitPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_limit_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderLimitPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "price", type: "string", required: true, description: "Limit price, validated against the maker and taker price bands for the given side." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position. It can never open or flip one. With nothing to reduce, the order is dropped with status `AUTO_CANCELED_REDUCE_ONLY`, or rejected up front with error `116`." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode. Any value other than `BOTH` on a non-futures margin market is rejected with error `1`." },
  { name: "post_only", type: "boolean", description: "Reject the order instead of taking liquidity. Cannot be combined with `ioc`." },
  { name: "ioc", type: "boolean", description: "Immediate-or-cancel — cancel the unmatched remainder instead of resting it. Cannot be combined with `post_only` or `rpi`." },
  { name: "rpi", type: "boolean", description: "Retail Price Improvement order. Implies `post_only`; cannot be combined with `ioc`." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const collateralOrderLimitPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted order. Returns the standard order object plus `reduce_only` and `position_side`. A margin limit order reports `type` `7`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin limit order", send: "collateral_order_limit_place", receive: "Accepted order object (status OPEN)", push: null },
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
      "code": 19,
      "message": "market is not margin market",
      "description": "The method was called on a spot-only market. Use the spot `order_*` equivalent there."
    },
    {
      "code": 14,
      "message": "margin order by taker price",
      "description": "A post-only margin order would cross the spread."
    },
    {
      "code": 17,
      "message": "user margin balance not enough",
      "description": "The collateral balance does not cover the order."
    },
    {
      "code": 111,
      "message": "margin position is too big",
      "description": "The resulting position would exceed the size cap for the market."
    },
    {
      "code": 112,
      "message": "margin pending orders value is too big",
      "description": "The total value of pending margin orders would exceed the account limit."
    },
    {
      "code": 114,
      "message": "order's position side does not match user's setting",
      "description": "`position_side` was sent without hedge mode enabled, or does not match the account setting."
    },
    {
      "code": 250,
      "message": "price must be >= X / <= Y",
      "description": "The limit price falls outside the market price band."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderLimitPlaceRequest = {
  "id": 500010,
  "method": "collateral_order_limit_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "buy",
      "amount": "0.001",
      "price": "63385.90",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderLimitPlaceResponse = {
  "id": 500010,
  "result": {
    "id": 2423735881146,
    "market": "BTC_PERP",
    "type": 7,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452691.474534,
    "mtime": 1786452691.474534,
    "price": "63385.9",
    "amount": "0.001",
    "left": "0.001",
    "deal_stock": "0",
    "deal_money": "0",
    "deal_fee": "0",
    "client_order_id": "",
    "stp": "no",
    "status": "OPEN"
  },
  "error": null
};
