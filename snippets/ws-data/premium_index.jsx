// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/premium_index.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { premiumIndexSubscribe, channelMeta, exSubscribeAllMarkets } from '/snippets/ws-data/premium_index.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const premiumIndexSubscribe = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `premiumIndex_subscribe`." },
  { name: "params", type: "array", required: true, description: "Market names — futures markets only (e.g., BTC_PERP). Empty array subscribes to every futures market and delivers all of them together in a single push per poll cycle; naming one or more markets instead delivers a separate push per market per poll cycle." },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

export const premiumIndexUpdateAll = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `premiumIndex_update`." },
  { name: "params", type: "array", required: true, description: "One PremiumIndexRecord per subscribed market. All subscribed markets arrive together in a single message." },
];

export const premiumIndexUpdatePerMarket = [
  { name: "id", type: "null", required: true, description: "Update events have null id" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `premiumIndex_update`." },
  { name: "params", type: "array", required: true, description: "Premium index record with a server timestamp — delivered as its own message when\nsubscribed to a named market:\n- [0] Market name\n- [1] Mark price\n- [2] Futures index price\n- [3] Futures funding rate\n- [4] Futures funding time\n- [5] Server timestamp" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `premiumIndex_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "Empty array — unsubscribes from all currently subscribed markets" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const premiumIndexRecordTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name" },
  { index: 1, field: "mark_price", type: "string", description: "Mark price, decimal string at market precision. Used for margin, PnL, liquidation, and ADL calculations." },
  { index: 2, field: "futures_index_price", type: "string", description: "Index price, decimal string at market precision. Reference spot price — not used in any trading calculation." },
  { index: 3, field: "futures_funding_rate", type: "string", description: "Funding rate, decimal string in the range -0.1 to 0.1 with up to 16 decimal places. Not used in calculations — stored and returned only." },
  { index: 4, field: "futures_funding_time", type: "integer", description: "Unix time (seconds) of the next funding settlement" },
];

export const premiumIndexRecordWithTimestampTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name" },
  { index: 1, field: "mark_price", type: "string", description: "Mark price, decimal string at market precision. Used for margin, PnL, liquidation, and ADL calculations." },
  { index: 2, field: "futures_index_price", type: "string", description: "Index price, decimal string at market precision. Reference spot price — not used in any trading calculation." },
  { index: 3, field: "futures_funding_rate", type: "string", description: "Funding rate, decimal string in the range -0.1 to 0.1 with up to 16 decimal places. Not used in calculations — stored and returned only." },
  { index: 4, field: "futures_funding_time", type: "integer", description: "Unix time (seconds) of the next funding settlement" },
  { index: 5, field: "server_timestamp", type: "number", description: "Moment the server sent this push, as a Unix timestamp. Not deterministic — match with a wildcard in automated checks." },
];

export const premiumIndexUpdatePerMarketParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name" },
  { index: 1, field: "mark_price", type: "string", description: "Mark price, decimal string at market precision. Used for margin, PnL, liquidation, and ADL calculations." },
  { index: 2, field: "futures_index_price", type: "string", description: "Index price, decimal string at market precision. Reference spot price — not used in any trading calculation." },
  { index: 3, field: "futures_funding_rate", type: "string", description: "Funding rate, decimal string in the range -0.1 to 0.1 with up to 16 decimal places. Not used in calculations — stored and returned only." },
  { index: 4, field: "futures_funding_time", type: "integer", description: "Unix time (seconds) of the next funding settlement" },
  { index: 5, field: "server_timestamp", type: "number", description: "Moment the server sent this push, as a Unix timestamp. Not deterministic — match with a wildcard in automated checks." },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Subscribe", send: "premiumIndex_subscribe", receive: "Confirmation (status: success)", push: "premiumIndex_update — snapshot for every subscribed market in one message (every 0.5 sec)" },
  { name: "Unsubscribe", send: "premiumIndex_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": false,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPer10Seconds": 12000
  },
  "errorCodes": [
    {
      "code": 1,
      "message": "invalid argument",
      "description": "The market passed in `params` is not a futures market, or does not exist. Premium index subscriptions are available only for futures markets (the `_PERP` suffix)."
    }
  ]
};

// ── Message examples ────────────────────────────────────────────────────────

export const exSubscribeAllMarkets = {
  "method": "premiumIndex_subscribe",
  "params": [],
  "id": 1
};

export const exSubscribeSpecificMarkets = {
  "method": "premiumIndex_subscribe",
  "params": [
    "BTC_PERP",
    "ADA_PERP"
  ],
  "id": 1
};

export const exPremiumIndexSubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 1
};

export const exPremiumIndexUpdate = {
  "method": "premiumIndex_update",
  "params": [
    [
      "BTC_PERP",
      "10000",
      "10003",
      "0.1",
      9999999
    ],
    [
      "ADA_PERP",
      "0.1111",
      "0.132",
      "-0.1",
      123123124
    ]
  ],
  "id": null
};

export const exPremiumIndexUpdatePerMarket = {
  "method": "premiumIndex_update",
  "params": [
    "BTC_PERP",
    "10000",
    "10003",
    "0.1",
    9999999,
    1779892807.794
  ],
  "id": null
};

export const exPremiumIndexUnsubscribe = {
  "method": "premiumIndex_unsubscribe",
  "params": [],
  "id": 2
};

export const exPremiumIndexUnsubscribeResponse = {
  "error": null,
  "result": {
    "status": "success"
  },
  "id": 2
};
