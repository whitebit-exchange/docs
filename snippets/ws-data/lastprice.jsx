// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/lastprice.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { lastpriceRequest, exLastpriceRequest } from '/snippets/ws-data/lastprice.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const lastpriceRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `lastprice_request`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const lastpriceResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "string", required: true, description: "Last price" },
  { name: "error", type: "null", required: true, description: "" },
];

export const lastpriceSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `lastprice_subscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const lastpriceUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `lastprice_update`." },
  { name: "params", type: "array", required: true, description: "Update event parameters:\n- [0] Market name\n- [1] Last price" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `lastprice_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exLastpriceRequest = {
  "id": 5,
  "method": "lastprice_request",
  "params": [
    "ETH_BTC"
  ]
};

export const exLastpriceResponse = {
  "id": 5,
  "result": "0.020553",
  "error": null
};

export const exLastpriceSubscribe = {
  "id": 6,
  "method": "lastprice_subscribe",
  "params": [
    "ETH_BTC",
    "BTC_USDT"
  ]
};

export const exLastpriceSubscribeResponse = {
  "id": 6,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exLastpriceUpdate = {
  "id": null,
  "method": "lastprice_update",
  "params": [
    "ETH_BTC",
    "0.020683"
  ]
};

export const exLastpriceUnsubscribe = {
  "id": 7,
  "method": "lastprice_unsubscribe",
  "params": []
};
