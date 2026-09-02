// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_stop_market_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderStopMarketPlaceRequest, channelMeta, exCollateralOrderStopMarketPlaceRequest } from '/snippets/ws-data/collateral_order_stop_market_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderStopMarketPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_stop_market_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderStopMarketPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision. A stop that closes a position takes the position size directly." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price, validated against the market price bands. Outside them the call returns error `251`." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position. Recommended for protective stops." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode. Optional at the request layer but functionally required in hedge mode — omitting it, or sending `BOTH`, is rejected with error `114`." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const collateralOrderStopMarketPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order with `price` `\"0\"`. A margin stop-market order reports `type` `10`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin stop-market order", send: "collateral_order_stop_market_place", receive: "Accepted conditional order (status OPEN, not activated)", push: null },
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
      "code": 19,
      "message": "market is not margin market",
      "description": "The method was called on a spot-only market. Use the spot `order_*` equivalent there."
    },
    {
      "code": 101,
      "message": "activation price should not be equal to the last price",
      "description": "The activation price equals the current last price. Move the trigger to either side of it."
    },
    {
      "code": 103,
      "message": "max num margin stop market orders",
      "description": "The per-market ceiling on conditional orders held by one user was reached. Cancel an existing stop before placing another."
    },
    {
      "code": 251,
      "message": "activation price is out of bands",
      "description": "The activation price falls outside the market price bands."
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
      "code": 114,
      "message": "order's position side does not match user's setting",
      "description": "`position_side` was sent (as non-`BOTH`) without hedge mode enabled, or was omitted or sent as `BOTH` while hedge mode is enabled, or otherwise does not match the account setting."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderStopMarketPlaceRequest = {
  "id": 500013,
  "method": "collateral_order_stop_market_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "sell",
      "amount": "0.001",
      "activation_price": "63385.76",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderStopMarketPlaceResponse = {
  "id": 500013,
  "result": {
    "id": 2423735886307,
    "market": "BTC_PERP",
    "type": 10,
    "side": 1,
    "post_only": false,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452692.167474,
    "mtime": 1786452692.167474,
    "activation_price": "63385.76",
    "activation_condition": "lte",
    "activated": 0,
    "price": "0",
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
