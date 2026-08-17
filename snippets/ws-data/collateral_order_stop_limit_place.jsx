// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_stop_limit_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderStopLimitPlaceRequest, channelMeta, exCollateralOrderStopLimitPlaceRequest } from '/snippets/ws-data/collateral_order_stop_limit_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderStopLimitPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_stop_limit_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderStopLimitPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price. The engine sets `activation_condition` to `gte` when the trigger sits above the market at placement, and `lte` when below." },
  { name: "price", type: "string", required: true, description: "Limit price of the margin order created on activation." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const collateralOrderStopLimitPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order with the activation and position fields present. A margin stop-limit order reports `type` `9` and `activated` `0` until the trigger fires." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin stop-limit order", send: "collateral_order_stop_limit_place", receive: "Accepted conditional order (status OPEN, not activated)", push: null },
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
      "code": 251,
      "message": "activation price is out of bands",
      "description": "The activation price falls outside the maker price bands."
    },
    {
      "code": 114,
      "message": "order's position side does not match user's setting",
      "description": "`position_side` was sent without hedge mode enabled, or does not match the account setting."
    },
    {
      "code": 116,
      "message": "margin order with reduce only is rejected",
      "description": "The order carries `reduce_only` but nothing is open on that side."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderStopLimitPlaceRequest = {
  "id": 500012,
  "method": "collateral_order_stop_limit_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "buy",
      "amount": "0.001",
      "price": "66263.38",
      "activation_price": "65298.38",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderStopLimitPlaceResponse = {
  "id": 500012,
  "result": {
    "id": 2423735883777,
    "market": "BTC_PERP",
    "type": 9,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452691.843409,
    "mtime": 1786452691.843409,
    "activation_price": "65298.38",
    "activation_condition": "gte",
    "activated": 0,
    "price": "66263.38",
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
