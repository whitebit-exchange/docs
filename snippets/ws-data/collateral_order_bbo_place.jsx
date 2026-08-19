// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/collateral_order_bbo_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { collateralOrderBboPlaceRequest, channelMeta, exCollateralOrderBboPlaceRequest } from '/snippets/ws-data/collateral_order_bbo_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const collateralOrderBboPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `collateral_order_bbo_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const collateralOrderBboPlaceParams = [
  { name: "market", type: "string", required: true, description: "Margin or futures market name. A spot-only market is rejected with error `19`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "bbo_role", type: "integer", required: true, enum: [1,2], description: "Pricing role. `1` maker — price at the own-side best and set `post_only`. `2` taker — price at the opposite-side best and cross the spread." },
  { name: "reduce_only", type: "boolean", description: "Restrict the order to shrinking an existing position." },
  { name: "position_side", type: "string", enum: ["BOTH","LONG","SHORT"], description: "Position leg in hedge mode; futures markets only. `BOTH` in one-way mode. Optional at the request layer but functionally required in hedge mode — omitting it, or sending `BOTH`, is rejected with error `114`." },
  { name: "ioc", type: "boolean", description: "Immediate-or-cancel — cancel the unmatched remainder instead of resting it." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const collateralOrderBboPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted order. Returns an ordinary margin limit order reporting `type` `7` — no BBO marker is kept. The `price` field holds the resolved price." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place margin BBO order", send: "collateral_order_bbo_place", receive: "Accepted limit order priced at the best bid", push: null },
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
      "code": 1,
      "message": "wrong flags combination",
      "description": "`post_only` was sent together with `bbo_role: 2`. The taker role cannot be post-only."
    },
    {
      "code": 14,
      "message": "margin order by taker price",
      "description": "A maker-role margin order would cross the spread."
    },
    {
      "code": 12,
      "message": "not enough traders",
      "description": "The order book has no quote on the required side, so the order cannot be priced."
    },
    {
      "code": 114,
      "message": "order's position side does not match user's setting",
      "description": "`position_side` was sent (as non-`BOTH`) without hedge mode enabled, or was omitted or sent as `BOTH` while hedge mode is enabled, or otherwise does not match the account setting."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exCollateralOrderBboPlaceRequest = {
  "id": 500014,
  "method": "collateral_order_bbo_place",
  "params": [
    {
      "market": "BTC_PERP",
      "side": "buy",
      "amount": "0.001",
      "bbo_role": 1,
      "stp": "no"
    }
  ]
};

export const exCollateralOrderBboPlaceResponse = {
  "id": 500014,
  "result": {
    "id": 2423735887551,
    "market": "BTC_PERP",
    "type": 7,
    "side": 2,
    "post_only": true,
    "ioc": false,
    "reduce_only": false,
    "position_side": "BOTH",
    "ctime": 1786452692.283438,
    "mtime": 1786452692.283438,
    "price": "64333.38",
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
