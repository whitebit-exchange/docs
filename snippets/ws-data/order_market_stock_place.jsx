// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/order_market_stock_place.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderMarketStockPlaceRequest, channelMeta, exOrderMarketStockPlaceRequest } from '/snippets/ws-data/order_market_stock_place.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderMarketStockPlaceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier. The response echoes this value." },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `order_market_stock_place`." },
  { name: "params", type: "array", required: true, description: "Array containing exactly one order parameter object" },
];

export const orderMarketStockPlaceParams = [
  { name: "market", type: "string", required: true, description: "Spot market name. A futures market is rejected with error `1`." },
  { name: "side", type: "string", required: true, enum: ["buy","sell"], description: "Order side. The response reports the side numerically: `1` for sell, `2` for buy." },
  { name: "amount", type: "string", required: true, description: "Order size in stock on both sides, at the market stock precision." },
  { name: "client_order_id", type: "string", description: "Custom client order id, echoed on the response. Must be unique among active orders — a collision returns error `43`." },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "Self-trade prevention mode: `no`=No Prevention, `co`=Cancel Oldest, `cn`=Cancel Newest, `cb`=Cancel Both. Defaults to `no` when omitted." },
];

export const orderMarketStockPlaceResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "Executed order. Returns the standard order object; `deal_money` reports the money actually spent or received. This method reports `type` `202`." },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Place market order in stock", send: "order_market_stock_place", receive: "Executed order object (status FILLED)", push: null },
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
      "code": 10,
      "message": "balance not enough",
      "description": "On a buy the engine still spends money, so the balance must cover the amount multiplied by the best ask, plus fee. A shortfall fills the order only partially."
    },
    {
      "code": 11,
      "message": "amount too small",
      "description": "The order is below the market `minAmount` or `minTotal`."
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
      "code": 51,
      "message": "trading in the market is not allowed",
      "description": "Trading is suspended, or the market runs in post-only mode — a market order is rejected there."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exOrderMarketStockPlaceRequest = {
  "id": 500004,
  "method": "order_market_stock_place",
  "params": [
    {
      "market": "ETH_USDT",
      "side": "buy",
      "amount": "0.00105",
      "stp": "no"
    }
  ]
};

export const exOrderMarketStockPlaceResponse = {
  "id": 500004,
  "result": {
    "id": 2423735871650,
    "market": "ETH_USDT",
    "type": 202,
    "side": 2,
    "post_only": false,
    "ioc": false,
    "ctime": 1786452690.20378,
    "mtime": 1786452690.20378,
    "price": "0",
    "amount": "0.00105",
    "left": "0",
    "deal_stock": "0.00105",
    "deal_money": "1.9824945",
    "deal_fee": "0.0000021",
    "client_order_id": "",
    "stp": "no",
    "status": "FILLED"
  },
  "error": null
};
