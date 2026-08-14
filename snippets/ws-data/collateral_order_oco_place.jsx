// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_oco_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderOcoPlaceRequest, channelMeta, exCollateralOrderOcoPlaceRequest } from '/snippets/ws-data/collateral_order_oco_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderOcoPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_oco_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one group parameter object" },
];

export const collateralOrderOcoPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Side of both legs. The legs always point the same way, because together they exit one position." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, applied to each leg." },
  { name: "price", type: "string", required: true, description: "Limit price of the take-profit leg. On a sell it sits above the market. A price that would cross as a taker is rejected with error `150`." },
  { name: "activation_price", type: "string", required: true, description: "Trigger price of the stop-loss leg, on the opposite side of the market from `price`." },
  { name: "stop_limit_price", type: "string", required: true, description: "Limit price the stop-loss leg is placed at once triggered. Set it beyond `activation_price` so the exit still fills after the trigger." },
  { name: "limit_client_order_id", type: "string", description: "Client order id for the take-profit leg. Must differ from `stop_client_order_id`." },
  { name: "stop_client_order_id", type: "string", description: "Client order id for the stop-loss leg. Must differ from `limit_client_order_id`." },
  { name: "reduce_only", type: "boolean", description: "Restrict both legs to shrinking an existing position." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const collateralOrderOcoPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Group object rather than a single order. Carries `type` `\"oco\"`, the group `id`, and the `take_profit` and `stop_loss` legs. Each leg is a full order object — the take-profit reports `type` `7`, the stop-loss `type` `9`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place OCO group", send: "collateral_order_oco_place", receive: "Group id with the take_profit and stop_loss legs", push: null },
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
      "description": "The method was called on a spot-only market. OCO is available on margin and futures markets only."
    },
    {
      "code": 150,
      "message": "take profit is not post only",
      "description": "The take-profit leg would execute immediately as a taker. It must rest as a maker order — move `price` further from the market."
    },
    {
      "code": 151,
      "message": "wrong activation price for stop loss",
      "description": "The stop-loss trigger sits on the wrong side of the current price."
    },
    {
      "code": 108,
      "message": "wrong limit price for take profit",
      "description": "The take-profit limit price is inconsistent with its trigger."
    },
    {
      "code": 1,
      "message": "limit_client_order_id and stop_client_order_id cannot be equal",
      "description": "The two legs were given the same client order id. Each leg needs its own, or neither."
    },
    {
      "code": 152,
      "message": "can not place stop loss / take profit",
      "description": "One of the legs could not be created. Error `153` covers the same condition for the other leg."
    },
    {
      "code": 161,
      "message": "conditional order validation",
      "description": "The group failed consistency validation as a whole."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderOcoPlaceRequest = {
  "id": 500016,
  "method": "collateral_order_oco_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "sell",
      "amount": "0.001",
      "price": "65301.08",
      "activation_price": "63370.99",
      "stop_limit_price": "62405.95",
      "stp": "no"
    }
  ]
};

export const exCollateralOrderOcoPlaceResponse = {
  "id": 500016,
  "result": {
    "type": "oco",
    "id": 2423735892717,
    "stop_loss": {
      "id": 2423735892718,
      "market": "BTC_PERP",
      "type": 9,
      "side": 1,
      "reduce_only": false,
      "position_side": "BOTH",
      "activation_price": "63370.99",
      "activation_condition": "lte",
      "activated": 0,
      "price": "62405.95",
      "amount": "0.001",
      "left": "0.001",
      "status": "OPEN"
    },
    "take_profit": {
      "id": 2423735892719,
      "market": "BTC_PERP",
      "type": 7,
      "side": 1,
      "reduce_only": false,
      "position_side": "BOTH",
      "price": "65301.08",
      "amount": "0.001",
      "left": "0.001",
      "status": "OPEN"
    }
  },
  "error": null
};
