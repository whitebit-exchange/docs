// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/orders_pending.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { ordersPendingRequest, exOrdersPendingRequest } from '/snippets/ws-data/orders_pending.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const ordersPendingRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersPending_request`." },
  { name: "params", type: "array", required: true, description: "Array with market, offset, and limit" },
];

export const ordersPendingResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const ordersPendingSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersPending_subscribe`." },
  { name: "params", type: "array", required: true, description: "Array of markets to subscribe to" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const ordersPendingUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersPending_update`." },
  { name: "params", type: "array", required: true, description: "Array with update event ID and order object" },
];

export const orderObject = [
  { name: "id", type: "integer", description: "Order ID" },
  { name: "market", type: "string", description: "Market" },
  { name: "type", type: "integer", description: "Order type. See order types table in overview" },
  { name: "side", type: "integer", enum: [1,2], description: "Side: 1=sell, 2=buy/bid" },
  { name: "post_only", type: "boolean", description: "Post only flag" },
  { name: "ioc", type: "boolean", description: "IOC (Immediate or Cancel) flag" },
  { name: "ctime", type: "number", description: "Created at in Unix time" },
  { name: "mtime", type: "number", description: "Modified at in Unix time" },
  { name: "price", type: "string", description: "Order price" },
  { name: "amount", type: "string", description: "Stock amount" },
  { name: "left", type: "string", description: "Stock amount remaining to be executed" },
  { name: "deal_stock", type: "string", description: "Executed stock amount" },
  { name: "deal_money", type: "string", description: "Executed Money amount" },
  { name: "deal_fee", type: "string", description: "Charged fee amount in money" },
  { name: "client_order_id", type: "string", description: "Custom client order id" },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "STP flag: no=No Prevention, co=Cancel Oldest, cn=Cancel Newest, cb=Cancel Both" },
  { name: "status", type: "string", description: "Order status (e.g., OPEN, FILLED, CANCELED)" },
  { name: "position_side", type: "string", enum: ["LONG","SHORT","BOTH"], description: "Position side - LONG or SHORT or BOTH" },
  { name: "rpi", type: "boolean", description: "Indicates Retail Price Improvement (RPI) mode for the order." },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersPending_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exOrdersPendingRequest = {
  "id": 8,
  "method": "ordersPending_request",
  "params": [
    "BTC_USDT",
    0,
    30
  ]
};

export const exOrdersPendingResponse = {
  "id": 8,
  "result": {
    "limit": 100,
    "offset": 0,
    "total": 1,
    "records": [
      {
        "id": 1212901344783,
        "market": "BTC_USDT",
        "type": 1,
        "side": 2,
        "post_only": false,
        "ioc": false,
        "ctime": 1738250918.558867,
        "mtime": 1738250918.558867,
        "price": "90000",
        "amount": "1",
        "left": "1",
        "deal_stock": "0",
        "deal_money": "0",
        "deal_fee": "0",
        "client_order_id": "",
        "stp": "no",
        "status": "OPEN",
        "position_side": "LONG",
        "rpi": true
      }
    ]
  },
  "error": null
};

export const exOrdersPendingSubscribe = {
  "id": 9,
  "method": "ordersPending_subscribe",
  "params": [
    "BTC_USDT",
    "ETH_BTC"
  ]
};

export const exOrdersPendingSubscribeResponse = {
  "id": 9,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exOrdersPendingUpdate = {
  "id": null,
  "method": "ordersPending_update",
  "params": [
    1,
    {
      "id": 1212904480922,
      "market": "BTC_USDT",
      "type": 1,
      "side": 2,
      "post_only": false,
      "ioc": false,
      "ctime": 1738250982.28914,
      "mtime": 1738250982.28914,
      "price": "90000",
      "amount": "1",
      "left": "1",
      "deal_stock": "0",
      "deal_money": "0",
      "deal_fee": "0",
      "client_order_id": "",
      "stp": "no",
      "status": "OPEN",
      "position_side": "LONG",
      "rpi": true
    }
  ]
};

export const exOrdersPendingUnsubscribe = {
  "id": 10,
  "method": "ordersPending_unsubscribe",
  "params": []
};

export const exOrdersPendingUnsubscribeResponse = {
  "id": 10,
  "result": {
    "status": "success"
  },
  "error": null
};
