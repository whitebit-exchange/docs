// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/borrows.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { borrowsSubscribe, channelMeta, exBorrowsSubscribe } from '/snippets/ws-data/borrows.jsx'

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

export const borrowRecord = [
  { name: "asset", type: "string", description: "Borrowed asset" },
  { name: "ctime", type: "number", description: "Borrow created date in Unix time" },
  { name: "mtime", type: "number", description: "Last update time in Unix time" },
  { name: "amount", type: "string", description: "Borrow amount (negative value)" },
  { name: "unrealized_funding", type: "string", description: "Funding to be paid on the next borrow stage change" },
  { name: "liq_price", type: "string", description: "Borrow liquidation price" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "borrowsMargin_subscribe", receive: "Confirmation (status: success)", push: "borrowsMargin_update — current borrow state for all open borrows" },
  { name: "Unsubscribe", send: "borrowsMargin_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": true,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPerMinute": 200
  },
  "errorCodes": "standard"
};

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
