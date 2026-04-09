// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/authorize.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { authorizeRequest, channelMeta, exAuthorizeRequest } from '/snippets/ws-data/authorize.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const authorizeRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `authorize`." },
  { name: "params", type: "array", required: true, description: "Array with WebSocket token and constant \"public\" string" },
];

export const authorizeResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "Error object (null on success)" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const authorizeRequestParamsTupleFields = [
  { index: 0, field: "token", type: "string", description: "WebSocket Token (get via `/api/v4/profile/websocket_token` endpoint)", required: true, example: "<WEB_SOCKET_TOKEN>" },
  { index: 1, field: "scope", type: "string", description: "Constant string, always should be \"public\"", required: true, example: "public", enum: ["public"] },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Authorize", send: "authorize", receive: "Confirmation (status: success)", push: null },
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

export const exAuthorizeRequest = {
  "id": 0,
  "method": "authorize",
  "params": [
    "<WEB_SOCKET_TOKEN>",
    "public"
  ]
};

export const exAuthorizeResponse = {
  "id": 0,
  "result": {
    "status": "success"
  },
  "error": null
};
