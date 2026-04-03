// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/orders_executed.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { ordersExecutedRequest, exOrdersExecutedRequest } from '/snippets/ws-data/orders_executed.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const ordersExecutedRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersExecuted_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters tuple:\n- [0] Filter object with market and order_types\n- [1] Offset\n- [2] Limit (max 100)" },
];

export const ordersExecutedResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const ordersExecutedSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersExecuted_subscribe`." },
  { name: "params", type: "array", required: true, description: "Subscription parameters tuple:\n- [0] Array of market names\n- [1] Filter (0=Limit and Market, 1=Limit, 2=Market)" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const ordersExecutedUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersExecuted_update`." },
  { name: "params", type: "array", required: true, description: "Array containing executed order object" },
];

export const executedOrderObject = [
  { name: "id", type: "integer", description: "Order ID" },
  { name: "ctime", type: "number", description: "Created at in Unix time" },
  { name: "ftime", type: "number", description: "Finished at in Unix time" },
  { name: "mtime", type: "number", description: "Modified at in Unix time" },
  { name: "market", type: "string", description: "Market" },
  { name: "source", type: "string", description: "Source (e.g., web, api)" },
  { name: "type", type: "integer", description: "Order type. See order types table in overview" },
  { name: "side", type: "integer", enum: [1,2], description: "Side: 1=sell, 2=buy/bid" },
  { name: "post_only", type: "boolean", description: "Post only flag" },
  { name: "ioc", type: "boolean", description: "IOC flag" },
  { name: "price", type: "string", description: "Order price" },
  { name: "amount", type: "string", description: "Stock amount" },
  { name: "left", type: "string", description: "Stock amount remaining to be executed" },
  { name: "deal_stock", type: "string", description: "Executed stock amount" },
  { name: "deal_money", type: "string", description: "Executed Money amount" },
  { name: "deal_fee", type: "string", description: "Charged fee amount in money" },
  { name: "client_order_id", type: "string", description: "Custom client order id" },
  { name: "stp", type: "string", enum: ["no","co","cn","cb"], description: "STP flag: no=No Prevention, co=Cancel Oldest, cn=Cancel Newest, cb=Cancel Both" },
  { name: "status", type: "string", description: "Order status (e.g., FILLED, CANCELED)" },
  { name: "position_side", type: "string", enum: ["LONG","SHORT","BOTH"], description: "Position side - LONG or SHORT or BOTH" },
  { name: "rpi", type: "boolean", description: "Indicates Retail Price Improvement (RPI) mode for the order." },
  { name: "fee_asset", type: "string", description: "Fee asset type" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ordersExecuted_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exOrdersExecutedRequest = {
  "id": 11,
  "method": "ordersExecuted_request",
  "params": [
    {
      "market": "BTC_USDT",
      "order_types": [
        1,
        2
      ]
    },
    0,
    30
  ]
};

export const exOrdersExecutedResponse = {
  "id": 11,
  "result": {
    "limit": 100,
    "offset": 0,
    "records": [
      {
        "id": 1212266594338,
        "ctime": 1738230617.886706,
        "ftime": 1738230617.886706,
        "market": "BTC_USDT",
        "source": "web",
        "type": 2,
        "side": 1,
        "post_only": false,
        "ioc": false,
        "price": "0",
        "amount": "1",
        "deal_stock": "1",
        "deal_money": "105366.06693468",
        "deal_fee": "10.536606693468",
        "client_order_id": "",
        "status": "FILLED",
        "fee_asset": "USDT",
        "rpi": false
      }
    ]
  },
  "error": null
};

export const exOrdersExecutedSubscribe = {
  "id": 12,
  "method": "ordersExecuted_subscribe",
  "params": [
    [
      "BTC_USDT",
      "ETH_BTC"
    ],
    0
  ]
};

export const exOrdersExecutedSubscribeResponse = {
  "id": 12,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exOrdersExecutedUpdate = {
  "id": null,
  "method": "ordersExecuted_update",
  "params": [
    {
      "id": 1212907216814,
      "market": "ETH_BTC",
      "type": 1,
      "side": 2,
      "post_only": false,
      "ioc": false,
      "ctime": 1738251046.720398,
      "mtime": 1738251048.442846,
      "price": "0.030832",
      "amount": "1",
      "left": "0",
      "deal_stock": "1",
      "deal_money": "0.030832",
      "deal_fee": "0.001",
      "client_order_id": "",
      "stp": "no",
      "status": "FILLED",
      "position_side": "LONG",
      "rpi": true
    }
  ]
};

export const exOrdersExecutedUnsubscribe = {
  "id": 13,
  "method": "ordersExecuted_unsubscribe",
  "params": []
};

export const exOrdersExecutedUnsubscribeResponse = {
  "id": 13,
  "result": {
    "status": "success"
  },
  "error": null
};
