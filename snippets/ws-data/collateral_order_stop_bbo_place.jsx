// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_stop_bbo_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderStopBboPlaceRequest, channelMeta, exCollateralOrderStopBboPlaceRequest } from '/snippets/ws-data/collateral_order_stop_bbo_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderStopBboPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_stop_bbo_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderStopBboPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price, validated against the market price bands. Outside them the call returns error `251`." },
  { name: "bbo_role", type: "integer", required: true, enum: [1,2], description: "Pricing role applied at activation. `1` maker — price at the own-side best and set `post_only`. `2` taker — price at the opposite-side best." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode. Optional at the request layer but functionally required in hedge mode — omitting it, or sending `BOTH`, is rejected with error `114`." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode applied to the order created on activation. Defaults to `no` when omitted." },
];

export const collateralOrderStopBboPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted conditional order reporting `type` `9` with `price` `\"0\"`, because the price is resolved from the order book only when the trigger fires." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin stop-BBO order", send: "collateral_order_stop_bbo_place", receive: "Accepted conditional order, price resolved on activation", push: null },
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
      "code": 1,
      "message": "bbo role must be an integer in range 1..2",
      "description": "The `bbo_role` value is outside `1`–`2`, or is not an integer."
    },
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
      "code": 12,
      "message": "not enough traders",
      "description": "The order book has no quote on the required side at activation, so the order cannot be priced and is dropped."
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

export const exCollateralOrderStopBboPlaceRequest = {
  "id": 500015,
  "method": "collateral_order_stop_bbo_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "sell",
      "amount": "0.001",
      "activation_price": "63385.76",
      "bbo_role": 1,
      "stp": "no"
    }
  ]
};

export const exCollateralOrderStopBboPlaceResponse = {
  "id": 500015,
  "result": {
    "id": 2423735891508,
    "market": "BTC_PERP",
    "type": 9,
    "side": 1,
    "post_only": true,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452692.612439,
    "mtime": 1786452692.612439,
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
