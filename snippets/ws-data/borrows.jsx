// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/borrows.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { borrowsSubscribe, exBorrowsSubscribe } from '/snippets/ws-data/borrows.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const borrowsSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsMargin_subscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for borrows subscription" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const borrowsUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsMargin_update`." },
  { name: "params", type: "object", required: true, description: "" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exBorrowsSubscribe = {
  "id": 18,
  "method": "borrowsMargin_subscribe",
  "params": []
};

export const exBorrowsSubscribeResponse = {
  "id": 18,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exBorrowsUpdate = {
  "method": "borrowsMargin_update",
  "params": {
    "total": 1,
    "records": [
      {
        "asset": "BTC",
        "ctime": 1704067200,
        "mtime": 1704067200,
        "amount": "-0.81",
        "unrealized_funding": "0.00005042",
        "liq_price": "70000"
      }
    ]
  },
  "id": null
};

export const exBorrowsUnsubscribe = {
  "id": 19,
  "method": "borrowsMargin_unsubscribe",
  "params": []
};

export const exBorrowsUnsubscribeResponse = {
  "id": 19,
  "result": {
    "status": "success"
  },
  "error": null
};
