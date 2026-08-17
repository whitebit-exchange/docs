// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_oto_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderOtoPlaceRequest, channelMeta, exCollateralOrderOtoPlaceRequest } from '/snippets/ws-data/collateral_order_oto_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderOtoPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_oto_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one group parameter object" },
];

export const collateralOrderOtoPlaceParams = [
  { name: "trigger_order_type", type: "string", required: true, enum: ["margin_limit","margin_market","margin_stop_limit","margin_stop_market","margin_bbo","margin_stop_bbo"], description: "Kind of entry order. `margin_market_oco` is not a valid trigger type." },
  { name: "trigger_order", type: "object", required: true, description: "Parameters of the entry order, exactly as the named method takes them — `market`, `side`, `amount`, plus `price`, `activation_price`, or `bbo_role` as that method requires. The `rpi` flag is not allowed here." },
  { name: "conditional_order_type", type: "string", required: true, enum: ["margin_market_oco","margin_take_profit","margin_limit","margin_stop_loss","margin_stop_limit"], description: "Kind of exit. `margin_market_oco` arms both sides. `margin_take_profit` and `margin_limit` arm a take-profit only. `margin_stop_loss` and `margin_stop_limit` arm a stop-loss only." },
  { name: "take_profit", type: "string", description: "Exit price on the profitable side. Required for take-profit and OCO exits, and rejected for stop-loss-only exits." },
  { name: "stop_loss", type: "string", description: "Exit price on the losing side. Required for stop-loss and OCO exits, and rejected for take-profit-only exits." },
];

export const collateralOrderOtoPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Group object carrying `type` `\"oto\"`, the group `id`, the echoed `conditional_order_type`, the `take_profit_price` and `stop_loss_price` values, and the `trigger_order` as a full order object. The exit legs hold no order ids until the entry fills." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place OTO group", send: "collateral_order_oto_place", receive: "Group id with the entry order and the exit prices", push: null },
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
      "message": "unknown order type",
      "description": "The `trigger_order_type` or `conditional_order_type` value is not recognised."
    },
    {
      "code": 1,
      "message": "trigger order can't be margin market OCO",
      "description": "`margin_market_oco` was used as the trigger type. It is valid only as an exit."
    },
    {
      "code": 1,
      "message": "take_profit and stop_loss are required",
      "description": "An OCO exit needs both prices."
    },
    {
      "code": 1,
      "message": "flags: rpi=1 can not be set for trigger in oto",
      "description": "The `rpi` flag is not allowed inside `trigger_order`."
    },
    {
      "code": 105,
      "message": "wrong activation price for take profit",
      "description": "The take-profit price sits on the wrong side of the entry price."
    },
    {
      "code": 106,
      "message": "wrong activation price for stop loss",
      "description": "The stop-loss price sits on the wrong side of the entry price."
    },
    {
      "code": 250,
      "message": "price must be >= X / <= Y",
      "description": "An exit price falls outside the price bands around the entry price."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderOtoPlaceRequest = {
  "id": 500017,
  "method": "collateral_order_oto_place",
  "params": [
    {
      "trigger_order_type": "margin_limit",
      "trigger_order": {
        "market": "BTC_PERP",
        "side": "buy",
        "amount": "0.001",
        "price": "63370.99",
        "stp": "no"
      },
      "conditional_order_type": "margin_market_oco",
      "take_profit": "66266.12",
      "stop_loss": "62405.95"
    }
  ]
};

export const exCollateralOrderOtoPlaceResponse = {
  "id": 500017,
  "result": {
    "type": "oto",
    "id": 2423735895134,
    "conditional_order_type": "margin_market_oco",
    "take_profit_price": "66266.12",
    "stop_loss_price": "62405.95",
    "trigger_order": {
      "id": 2423735895135,
      "market": "BTC_PERP",
      "type": 7,
      "side": 2,
      "post_only": false,
      "ioc": false,
      "reduce_only": false,
      "position_side": "BOTH",
      "ctime": 1786452692.945421,
      "mtime": 1786452692.945421,
      "price": "63370.99",
      "amount": "0.001",
      "left": "0.001",
      "deal_stock": "0",
      "deal_money": "0",
      "deal_fee": "0",
      "client_order_id": "",
      "stp": "no",
      "status": "OPEN"
    }
  },
  "error": null
};
