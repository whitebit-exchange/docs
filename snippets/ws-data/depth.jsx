// AUTO-GENERATED — do not edit manually.
// Source: asyncapi/public/depth.yaml
// Regenerate: node scripts/generate-ws-data.mjs
//
// Schema exports (camelCase)  → feed <WsSchemaTable fields={...} />
// Example exports (ex prefix) → feed <WsMessageExample data={...} />
// channelMeta                 → feed <WsAuthBadge>, <WsRateLimits>, and <WsErrorCodes>
//   import { orderBook, channelMeta, exDepthRequest } from '/snippets/ws-data/depth.jsx'

// ── Schema field arrays ─────────────────────────────────────────────────────

export const orderBook = [
  { name: "timestamp", type: "number", required: true, description: "Timestamp from matchengine" },
  { name: "asks", type: "array", required: true, description: "Asks sorted ascending" },
  { name: "bids", type: "array", required: true, description: "Bids sorted descending" },
];

export const depthUpdateData = [
  { name: "timestamp", type: "number", required: true, description: "Timestamp from matchengine" },
  { name: "update_id", type: "integer", description: "Update ID" },
  { name: "past_update_id", type: "integer", description: "Previous update ID (present in incremental updates only, not in first snapshot)" },
  { name: "asks", type: "array", required: true, description: "" },
  { name: "bids", type: "array", required: true, description: "" },
  { name: "event_time", type: "number", required: true, description: "Event time" },
];

export const depthRequest = [
  { name: "id", type: "integer", required: true, description: "Unique request identifier" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `depth_request`." },
  { name: "params", type: "array", required: true, description: "Query parameters:\n- [0] Market name\n- [1] Limit (max 100)\n- [2] Price interval units. Available values: \"0\" (no interval), \"0.00000001\", \"0.0000001\", \"0.000001\", \"0.00001\", \"0.0001\", \"0.001\", \"0.01\", \"0.1\"" },
];

export const depthResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const depthSubscribe = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `depth_subscribe`." },
  { name: "params", type: "array", required: true, description: "Subscription parameters:\n- [0] Market name\n- [1] Limit (1, 5, 10, 20, 30, 50, or 100)\n- [2] Price interval units\n- [3] Multiple subscription flag (true=add, false=unsubscribe all)" },
];

export const subscriptionResponse = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "result", type: "object", required: true, description: "" },
  { name: "error", type: "null", required: true, description: "" },
];

export const depthUpdate = [
  { name: "id", type: "null", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `depth_update`." },
  { name: "params", type: "array", required: true, description: "Update event parameters:\n- [0] Full reload flag (true=full snapshot, false=incremental)\n- [1] Order book data (DepthUpdateData object)\n- [2] Market name" },
];

export const unsubscribeRequest = [
  { name: "id", type: "integer", required: true, description: "" },
  { name: "method", type: "string", required: true, description: "Method name. Fixed value: `depth_unsubscribe`." },
  { name: "params", type: "array", required: true, description: "" },
];

// ── Tuple field arrays ──────────────────────────────────────────────────────

export const depthRequestParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name", required: true, example: "ETH_BTC" },
  { index: 1, field: "limit", type: "integer", description: "Limit (max 100)", required: true, example: "100" },
  { index: 2, field: "price_interval", type: "string", description: "Price interval units. Available values: \"0\" (no interval), \"0.00000001\", \"0.0000001\", \"0.000001\", \"0.00001\", \"0.0001\", \"0.001\", \"0.01\", \"0.1\"", required: true, example: "0" },
];

export const depthSubscribeParamsTupleFields = [
  { index: 0, field: "market", type: "string", description: "Market name", required: true, example: "ETH_BTC" },
  { index: 1, field: "limit", type: "integer", description: "Limit", required: true, example: "100", enum: [1,5,10,20,30,50,100] },
  { index: 2, field: "price_interval", type: "string", description: "Price interval units. Available values: \"0\" (no interval), \"0.00000001\", \"0.0000001\", \"0.000001\", \"0.00001\", \"0.0001\", \"0.001\", \"0.01\", \"0.1\"", required: true, example: "0" },
  { index: 3, field: "multi_depth", type: "boolean", description: "Multiple subscription flag: true = add subscription, false = unsubscribe from all", required: true, example: "true" },
];

// ── Channel operations ──────────────────────────────────────────────────────

export const channelOperations = [
  { name: "Query", send: "depth_request", receive: "Full order book snapshot", push: null },
  { name: "Subscribe", send: "depth_subscribe", receive: "Confirmation (status: success)", push: "depth_update — full snapshot (first), then incremental updates" },
  { name: "Unsubscribe", send: "depth_unsubscribe", receive: "Confirmation (status: success)", push: null },
];

// ── Channel metadata ────────────────────────────────────────────────────────

export const channelMeta = {
  "authRequired": false,
  "rateLimits": {
    "connectionsPerMinute": 1000,
    "requestsPerMinute": 200
  },
  "errorCodes": "standard"
};

// ── Message examples ────────────────────────────────────────────────────────

export const exDepthRequest = {
  "id": 11,
  "method": "depth_request",
  "params": [
    "ETH_BTC",
    100,
    "0"
  ]
};

export const exDepthResponse = {
  "id": 11,
  "result": {
    "timestamp": 1689600180.516447,
    "asks": [
      [
        "0.020846",
        "29.369"
      ],
      [
        "0.020850",
        "15.123"
      ],
      [
        "0.020855",
        "8.456"
      ]
    ],
    "bids": [
      [
        "0.02083",
        "9.598"
      ],
      [
        "0.020825",
        "12.345"
      ],
      [
        "0.020820",
        "20.678"
      ]
    ]
  },
  "error": null
};

export const exDepthSubscribe = {
  "id": 12,
  "method": "depth_subscribe",
  "params": [
    "ETH_BTC",
    100,
    "0",
    true
  ]
};

export const exDepthFullReload = {
  "id": null,
  "method": "depth_update",
  "params": [
    true,
    {
      "timestamp": 1689600180.516447,
      "asks": [
        [
          "0.020846",
          "29.369"
        ],
        [
          "0.020850",
          "15.123"
        ],
        [
          "0.020855",
          "8.456"
        ]
      ],
      "bids": [
        [
          "0.02083",
          "9.598"
        ],
        [
          "0.020825",
          "12.345"
        ],
        [
          "0.020820",
          "20.678"
        ]
      ],
      "update_id": 214403,
      "event_time": 1749026542.817343
    },
    "ETH_BTC"
  ]
};

export const exDepthPartialUpdate = {
  "id": null,
  "method": "depth_update",
  "params": [
    false,
    {
      "timestamp": 1689600180.516447,
      "update_id": 214403,
      "past_update_id": 214399,
      "asks": [
        [
          "0.020861",
          "0"
        ],
        [
          "0.020900",
          "2.5"
        ]
      ],
      "bids": [
        [
          "0.020844",
          "5.949"
        ],
        [
          "0.020800",
          "0"
        ]
      ],
      "event_time": 1749026542.817343
    },
    "ETH_BTC"
  ]
};
