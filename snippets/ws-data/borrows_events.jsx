// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/borrows_events.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { borrowsEventsSubscribe, exBorrowsEventsSubscribe } from '/snippets/ws-data/borrows_events.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const borrowsEventsSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsAccountMargin_subscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const borrowsEventsUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsAccountMargin_update`." },
  { name: "params", type: "array", required: true, description: "Event tuple:\n- [0] Event type (1=Margin call, 2=Liquidation)\n- [1] Borrow object with all borrow details" },
];

export const borrowRecord = [
  { name: "asset", type: "string", description: "Borrowed asset" },
  { name: "ctime", type: "number", description: "Borrow created date in Unix time" },
  { name: "mtime", type: "number", description: "Last update time in Unix time" },
  { name: "amount", type: "string", description: "Borrow amount (negative value)" },
  { name: "unrealized_funding", type: "string", description: "Funding to be paid on next borrow stage change" },
  { name: "liq_price", type: "string", description: "Borrow liquidation price" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `borrowsAccountMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const borrowsEventsUpdateParamsTupleFields = [
  { index: 0, field: "event_type", type: "integer", description: "Event type: 1=Margin call, 2=Liquidation", enum: [1,2], enumLabels: {"1":"Margin call","2":"Liquidation"} },
  { index: 1, field: "borrow", type: "object", description: "Borrow object (same structure as Borrows endpoint)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "borrowsAccountMargin_subscribe", receive: "Confirmation (status: success)", push: "borrowsAccountMargin_update — margin call or liquidation event" },
  { name: "Unsubscribe", send: "borrowsAccountMargin_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exBorrowsEventsSubscribe = {
  "method": "borrowsAccountMargin_subscribe",
  "params": [],
  "id": 1
};

export const exBorrowsEventsSubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 1
};

export const exBorrowsEventsUpdate = {
  "method": "borrowsAccountMargin_update",
  "params": [
    1,
    {
      "asset": "USDT",
      "ctime": 1737731478.690442,
      "mtime": 1737731478.690442,
      "amount": "-3895.7476176",
      "unrealized_funding": "0.00267248",
      "liq_price": "NaN"
    }
  ],
  "id": null
};

export const exBorrowsEventsUnsubscribe = {
  "method": "borrowsAccountMargin_unsubscribe",
  "params": [],
  "id": 1
};

export const exBorrowsEventsUnsubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 1
};
