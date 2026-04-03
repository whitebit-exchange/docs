// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/service.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
//   import { baseRequest, exOrdersPendingRequest } from '/snippets/ws-data/service'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const baseRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
];

export const baseResponse = [
  { name: "id", type: "integer", required: true, description: "Request identifier matching the request" },
  { name: "error", type: "null", required: true, description: "" },
];

// ── Message examples ────────────────────────────────────────────────────────

export const exPingRequest = {
  "id": 0,
  "method": "ping",
  "params": []
};

export const exPingResponse = {
  "id": 0,
  "result": "pong",
  "error": null
};

export const exTimeRequest = {
  "id": 1,
  "method": "time",
  "params": []
};

export const exTimeResponse = {
  "id": 1,
  "result": 1493285895,
  "error": null
};
