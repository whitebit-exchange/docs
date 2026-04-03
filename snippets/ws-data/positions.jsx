// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/positions.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { positionsSubscribe, exPositionsSubscribe } from '/snippets/ws-data/positions.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const positionsSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsMargin_subscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for positions subscription" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const positionsUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsMargin_update`." },
  { name: "params", type: "object", required: true, description: "" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exPositionsSubscribe = {
  "id": 16,
  "method": "positionsMargin_subscribe",
  "params": []
};

export const exPositionsSubscribeResponse = {
  "id": 16,
  "result": {
    "status": "success"
  },
  "error": null
};

export const exPositionsUpdate = {
  "method": "positionsMargin_update",
  "params": {
    "total": 1,
    "records": [
      {
        "id": 2,
        "market": "BTC_USDT",
        "ctime": 1704067200,
        "mtime": 1704067200,
        "amount": "-0.01",
        "amount_in_money": "118.762",
        "base_price": "60000",
        "pnl": "-0.47",
        "liq_price": "65000",
        "liq_stage": null,
        "unrealized_funding": "0",
        "funding": "0",
        "margin": "23.8",
        "free_margin": "999932.92",
        "realized_pnl": "0",
        "position_side": "LONG"
      }
    ]
  },
  "id": null
};

export const exPositionsUnsubscribe = {
  "id": 17,
  "method": "positionsMargin_unsubscribe",
  "params": []
};

export const exPositionsUnsubscribeResponse = {
  "id": 17,
  "result": {
    "status": "success"
  },
  "error": null
};
