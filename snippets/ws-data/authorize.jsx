// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/private/authorize.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { authorizeRequest, exAuthorizeRequest } from '/snippets/ws-data/authorize.jsx'

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
