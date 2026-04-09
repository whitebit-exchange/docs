// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/margin_positions_events.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { marginPositionsEventsSubscribe, channelMeta, exMarginPositionsEventsSubscribe } from '/snippets/ws-data/margin_positions_events.jsx'

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

export const positionRecord = [
  { name: "id", type: "integer", description: "Position ID" },
  { name: "market", type: "string", description: "Market name" },
  { name: "ctime", type: "number", description: "Date of position opening in Unix time" },
  { name: "mtime", type: "number", description: "Date of position modifying in Unix time" },
  { name: "amount", type: "string", description: "Position amount (negative = short)" },
  { name: "amount_in_money", type: "string", description: "Position amount in money" },
  { name: "base_price", type: "string", description: "Base price of position" },
  { name: "pnl", type: "string", description: "Unrealized PnL in **money**" },
  { name: "liq_price", type: "string", description: "Liquidation price" },
  { name: "liq_stage", type: "string", enum: [null,"margin_call","liquidation"], description: "Liquidation state. Possible values: null, margin_call, liquidation" },
  { name: "unrealized_funding", type: "string", description: "Funding to be paid on next position stage change" },
  { name: "funding", type: "string", description: "Funding already disbursed" },
  { name: "margin", type: "string", description: "Own funds amount in open position in **money**" },
  { name: "free_margin", type: "string", description: "Free funds for trading" },
  { name: "realized_pnl", type: "string", description: "Realized PnL in **money**" },
  { name: "position_side", type: "string", enum: ["LONG","SHORT","BOTH"], description: "Position side - LONG or SHORT or BOTH" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `positionsAccountMargin_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const marginPositionsEventsUpdateParamsTupleFields = [
  { index: 0, field: "event_type", type: "integer", description: "Event type: 1=Margin call, 2=Liquidation", enum: [1,2], enumLabels: {"1":"Margin call","2":"Liquidation"} },
  { index: 1, field: "position", type: "object", description: "Position object (same structure as Positions endpoint)" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "positionsAccountMargin_subscribe", receive: "Confirmation (status: success)", push: "positionsAccountMargin_update — margin call or liquidation event" },
  { name: "Unsubscribe", send: "positionsAccountMargin_unsubscribe", receive: "Confirmation (status: success)", push: null },
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
