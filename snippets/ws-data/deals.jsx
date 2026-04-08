// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/deals.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { dealsRequest, exDealsRequest } from '/snippets/ws-data/deals.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const dealsRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `deals_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters tuple:\n- [0] Market name (STRING)\n- [1] Offset (INTEGER)\n- [2] Limit (INTEGER, max 100)" },
];

export const dealsResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const dealsSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `deals_subscribe`." },
  { name: "params", type: "array", required: true, description: "Array containing array of markets" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const dealsUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `deals_update`." },
  { name: "params", type: "array", required: true, description: "Update event tuple (11 elements):\n- [0] Deal ID\n- [1] Deal time (Unix timestamp)\n- [2] Market\n- [3] Order ID\n- [4] Price\n- [5] Stock amount\n- [6] Deal fee\n- [7] Client order ID\n- [8] Side (1=sell, 2=buy)\n- [9] Role (1=maker, 2=taker)\n- [10] Fee asset" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `deals_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const dealsUpdateParamsTupleFields = [
  { index: 0, field: "deal_id", type: "integer", description: "Unique deal ID", example: "13674578673" },
  { index: 1, field: "time", type: "number", description: "Unix timestamp of execution", example: "1738251095.345432" },
  { index: 2, field: "market", type: "string", description: "Market name", example: "\"ETH_BTC\"" },
  { index: 3, field: "order_id", type: "integer", description: "Order ID", example: "1212909726406" },
  { index: 4, field: "price", type: "string", description: "Execution price", example: "\"0.03084\"" },
  { index: 5, field: "amount", type: "string", description: "Stock amount executed", example: "\"0.2625\"" },
  { index: 6, field: "fee", type: "string", description: "Fee charged", example: "\"0.0002625\"" },
  { index: 7, field: "client_order_id", type: "string", description: "Custom client order ID (may be empty)", example: "\"\"" },
  { index: 8, field: "side", type: "integer", description: "1 = sell, 2 = buy", example: "2", enum: [1,2] },
  { index: 9, field: "role", type: "integer", description: "1 = maker, 2 = taker", example: "2", enum: [1,2] },
  { index: 10, field: "fee_asset", type: "string", description: "Asset in which fee was charged", example: "\"ETH\"" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Query", send: "deals_request", receive: "Paginated list of deals", push: null },
  { name: "Subscribe", send: "deals_subscribe", receive: "Confirmation (status: success)", push: "deals_update — new trade execution" },
  { name: "Unsubscribe", send: "deals_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exDealsRequest = {
  "id": 14,
  "method": "deals_request",
  "params": [
    "BTC_USDT",
    0,
    30
  ]
};

export const exDealsResponse = {
  "id": 14,
  "result": {
    "limit": 100,
    "offset": 0,
    "records": [
      {
        "time": 1738230617.886706,
        "id": 13663227034,
        "side": 1,
        "role": 2,
        "price": "105361.32",
        "amount": "0.160998",
        "deal": "16962.96179736",
        "fee": "1.696296179736",
        "order_id": 1212266594338,
        "deal_order_id": 1212266160846,
        "market": "BTC_USDT",
        "client_order_id": "",
        "fee_asset": "USDT"
      }
    ]
  },
  "error": null
};

export const exDealsSubscribe = {
  "id": 15,
  "method": "deals_subscribe",
  "params": [
    [
      "BTC_USDT",
      "ETH_BTC"
    ]
  ]
};

export const exDealsSubscribeResponse = {
  "id": 15,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exDealsUpdate = {
  "id": null,
  "method": "deals_update",
  "params": [
    13674578673,
    1738251095.345432,
    "ETH_BTC",
    1212909726406,
    "0.03084",
    "0.2625",
    "0.0002625",
    "",
    2,
    2,
    "ETH"
  ]
};

export const exDealsUnsubscribe = {
  "id": 16,
  "method": "deals_unsubscribe",
  "params": []
};

export const exDealsUnsubscribeResponse = {
  "id": 16,
  "result": {
    "status": "success"
  },
  "error": null
};
