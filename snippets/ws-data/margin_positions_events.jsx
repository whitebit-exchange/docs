// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/margin_positions_events.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { marginPositionsEventsSubscribe, exOrdersPendingRequest } from '/snippets/ws-data/margin_positions_events'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const marginPositionsEventsSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsAccountMargin_subscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const marginPositionsEventsUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsAccountMargin_update`." },
  { name: "params", type: "array", required: true, description: "Event tuple:\n- [0] Event type (1=Margin call, 2=Liquidation)\n- [1] Position object with all position details" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsAccountMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exMarginPositionsEventsSubscribe = {
  "method": "positionsAccountMargin_subscribe",
  "params": [],
  "id": 1
};

export const exMarginPositionsEventsSubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 1
};

export const exMarginPositionsEventsUpdate = {
  "method": "positionsAccountMargin_update",
  "params": [
    1,
    {
      "id": 184,
      "market": "BTC_USDT",
      "ctime": 1737731271.306934,
      "mtime": 1737731271.306934,
      "amount": "-0.094048",
      "amount_in_money": "9939.79769088",
      "base_price": "105688.56",
      "pnl": "-1157.88",
      "liq_price": "126462.54",
      "liq_stage": "margin_call",
      "unrealized_funding": "0.0231431327519745",
      "funding": "0",
      "margin": "1109.77",
      "free_margin": "-652.9",
      "realized_pnl": "-8.945817921792",
      "position_side": "LONG"
    }
  ],
  "id": null
};

export const exMarginPositionsEventsUnsubscribe = {
  "method": "positionsAccountMargin_unsubscribe",
  "params": [],
  "id": 1
};

export const exMarginPositionsEventsUnsubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 1
};
