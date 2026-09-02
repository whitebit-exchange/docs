// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_tpsl_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderTpslPlaceRequest, channelMeta, exCollateralOrderTpslPlaceRequest } from '/snippets/ws-data/collateral_order_tpsl_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderTpslPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_tpsl_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one parameter object" },
];

export const collateralOrderTpslPlaceParams = [
  { name: "market", type: "string", required: true, description: "Market the position is open on. Without an open position the call fails with error `104`." },
  { name: "take_profit_activation_price", type: "string", description: "Trigger for the take-profit leg. On a long position it sits above the market. At least one of the two activation prices must be present." },
  { name: "stop_loss_activation_price", type: "string", description: "Trigger for the stop-loss leg. On a long position it sits below the market. At least one of the two activation prices must be present." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Which position leg to protect in hedge mode; futures markets only. `BOTH` in one-way mode." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const collateralOrderTpslPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Object holding the `take_profit` and `stop_loss` legs. Unlike OCO and OTO there is no group id — the legs are independent orders, each reporting `type` `10` with `amount` `\"0\"`, meaning whatever the position holds at trigger time." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Attach take-profit and stop-loss", send: "collateral_order_tpsl_place", receive: "Two independent legs, no group id", push: null },
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
      "code": 104,
      "message": "margin position not exists",
      "description": "No open position exists on the market to attach the pair to."
    },
    {
      "code": 1,
      "message": "one of activations prices should be set",
      "description": "Neither `take_profit_activation_price` nor `stop_loss_activation_price` was supplied. At least one is required."
    },
    {
      "code": 105,
      "message": "wrong activation price for take profit",
      "description": "The take-profit trigger sits on the wrong side of the market for the open position."
    },
    {
      "code": 106,
      "message": "wrong activation price for stop loss",
      "description": "The stop-loss trigger sits on the wrong side of the market for the open position."
    },
    {
      "code": 151,
      "message": "wrong activation price for stop loss",
      "description": "The stop-loss trigger sits on the wrong side of the current price."
    },
    {
      "code": 153,
      "message": "can not place take profit",
      "description": "A leg could not be created. Error `152` covers the same condition for the stop-loss leg."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderTpslPlaceRequest = {
  "id": 500018,
  "method": "collateral_order_tpsl_place",
  "params": [
    {
      "market": "BTC_PERP",
      "stop_loss_activation_price": "63388.57",
      "take_profit_activation_price": "65319.18",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderTpslPlaceResponse = {
  "id": 500018,
  "result": {
    "take_profit": {
      "id": 2423735898205,
      "market": "BTC_PERP",
      "type": 10,
      "side": 1,
      "reduce_only": false,
      "position_side": "BOTH",
      "ctime": 1786452693.229424,
      "activation_price": "65319.18",
      "activation_condition": "gte",
      "activated": 0,
      "price": "0",
      "amount": "0",
      "left": "0",
      "status": "OPEN"
    },
    "stop_loss": {
      "id": 2423735898206,
      "market": "BTC_PERP",
      "type": 10,
      "side": 1,
      "reduce_only": false,
      "position_side": "BOTH",
      "ctime": 1786452693.229424,
      "activation_price": "63388.57",
      "activation_condition": "lte",
      "activated": 0,
      "price": "0",
      "amount": "0",
      "left": "0",
      "status": "OPEN"
    }
  },
  "error": null
};
