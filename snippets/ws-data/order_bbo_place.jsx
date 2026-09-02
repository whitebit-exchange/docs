// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_bbo_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderBboPlaceRequest, channelMeta, exOrderBboPlaceRequest } from '/snippets/ws-data/order_bbo_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderBboPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_bbo_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderBboPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock, at the market stock precision." },
  { name: "bbo_role", type: "integer", required: true, enum: [1,2], description: "Pricing role. `1` maker — price at the own-side best and set `post_only`. `2` taker — price at the opposite-side best and cross the spread. Any other value is rejected with error `1`." },
  { name: "ioc", type: "boolean", description: "Immediate-or-cancel — cancel the unmatched remainder instead of resting it." },
  { name: "post_only", type: "boolean", description: "Accepted only together with `bbo_role: 1`, which already implies it. Sending it with `bbo_role: 2` is rejected as a wrong flag combination." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const orderBboPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Accepted order. Returns an ordinary limit order reporting `type` `1` — no BBO marker is kept. The `price` field holds the resolved price, and `post_only` is `true` for the maker role." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place BBO order", send: "order_bbo_place", receive: "Accepted limit order priced at the best bid", push: null },
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
      "code": 12,
      "message": "not enough traders",
      "description": "The order book has no quote on the required side, so the order cannot be priced."
    },
    {
      "code": 13,
      "message": "order by taker price",
      "description": "A maker-role order would cross the spread."
    },
    {
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading is suspended, or the market status blocks this method."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderBboPlaceRequest = {
  "id": 500008,
  "method": "order_bbo_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "buy",
      "amount": "0.00108",
      "bbo_role": 1,
      "stp": "no"
    }
  ]
};

export const exOrderBboPlaceResponse = {
  "id": 500008,
  "result": {
    "id": 2423735877878,
    "market": "ETH_USDT",
    "type": 1,
    "side": 2,
    "post_only": true,
    "ioc": false,
    "ctime": 1786452691.024254,
    "mtime": 1786452691.024254,
    "price": "1888.06",
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
