// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/adl_quantile.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { aDLQuantileSubscribe, channelMeta, exSubscribeAllPositions } from '/snippets/ws-data/adl_quantile.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const aDLQuantileSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ADLQuantile_subscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const aDLQuantileUpdate = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ADLQuantile_update`." },
  { name: "params", type: "array", required: true, description: "One ADLQuantileRecord per subscribed market. When subscribed to several markets (empty `params` on subscribe), all of them arrive together in a single message." },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `ADLQuantile_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array for unsubscribe" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const aDLQuantileRecordTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name" },
  { index: 1, field: "quantile_long", type: "integer", description: "ADL quantile for the long side, 0-4. `null` when the account has no long exposure on this market. See ADL Grade for the meaning of each value.", enum: [null,0,1,2,3,4] },
  { index: 2, field: "quantile_short", type: "integer", description: "ADL quantile for the short side, 0-4. `null` when the account has no short exposure on this market. See ADL Grade for the meaning of each value.", enum: [null,0,1,2,3,4] },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "ADLQuantile_subscribe", receive: "Confirmation (status: success)", push: "ADLQuantile_update — aDL quantile snapshot for every subscribed market" },
  { name: "Unsubscribe", send: "ADLQuantile_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": true,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPer10Seconds": 12000
  },
  "errorCodes": [
    {
      "code": 6,
      "message": "require authentication",
      "description": "The connection did not call `authorize` before subscribing or unsubscribing. ADL quantile is a private channel — authorize the connection first."
    },
    {
      "code": 1,
      "message": "invalid argument",
      "description": "The market passed in `params` is not a futures market, or does not exist. ADL quantile subscriptions are available only for futures markets (the `_PERP` suffix)."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exSubscribeAllPositions = {
  "method": "ADLQuantile_subscribe",
  "params": [],
  "id": 12345678
};

export const exSubscribeSingleMarket = {
  "method": "ADLQuantile_subscribe",
  "params": [
    "BTC_PERP"
  ],
  "id": 12345678
};

export const exAdlQuantileSubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 12345678
};

export const exAdlQuantileUpdate = {
  "method": "ADLQuantile_update",
  "params": [
    [
      "BTC_PERP",
      null,
      4
    ]
  ],
  "id": null
};

export const exAdlQuantileUnsubscribe = {
  "method": "ADLQuantile_unsubscribe",
  "params": [],
  "id": 12345679
};

export const exAdlQuantileUnsubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 12345679
};
