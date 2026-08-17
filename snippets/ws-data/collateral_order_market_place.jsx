// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_market_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderMarketPlaceRequest, channelMeta, exCollateralOrderMarketPlaceRequest } from '/snippets/ws-data/collateral_order_market_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderMarketPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_market_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderMarketPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock on both sides, at the market stock precision." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position. Set it when closing, so a stale size cannot flip the position." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const collateralOrderMarketPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Executed order with `price` `\"0\"`, because a market order carries no limit price. A margin market order reports `type` `8`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin market order", send: "collateral_order_market_place", receive: "Executed order object (status FILLED)", push: null },
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
      "code": 17,
      "message": "user margin balance not enough",
      "description": "The collateral balance does not cover the order."
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
      "code": 115,
      "message": "order would result in a new position in the opposite direction",
      "description": "A reduce-only order would flip the position instead of shrinking it."
    },
    {
      "code": 116,
      "message": "margin order with reduce only is rejected",
      "description": "The order carries `reduce_only` but nothing is open on that side."
    },
    {
      "code": 111,
      "message": "margin position is too big",
      "description": "The resulting position would exceed the size cap for the market."
    },
    {
      "code": 114,
      "message": "order's position side does not match user's setting",
      "description": "`position_side` was sent without hedge mode enabled, or does not match the account setting."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderMarketPlaceRequest = {
  "id": 500011,
  "method": "collateral_order_market_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "sell",
      "amount": "0.001",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderMarketPlaceResponse = {
  "id": 500011,
  "result": {
    "id": 2423735883079,
    "market": "BTC_PERP",
    "type": 8,
    "side": 1,
    "post_only": false,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452691.765391,
    "mtime": 1786452691.765391,
    "price": "0",
    "amount": "0.001",
    "left": "0",
    "deal_stock": "0.001",
    "deal_money": "64.33338",
    "deal_fee": "0.0218733492",
    "client_order_id": "",
    "stp": "no",
    "status": "FILLED"
  },
  "error": null
};
