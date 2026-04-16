// AUTO-GENERATED — do not edit manually.
// Source: data/auth.yaml
// Regenerate: node scripts/generate-concept-data.mjs
//
//   import { requiredHeaders, keyConstraints, permissionLevels, ... } from '/snippets/concept-data/auth.jsx'

export const requiredHeaders = [
  { header: "Content-type", value: "application/json", description: "Specifies JSON format" },
  { header: "X-TXC-APIKEY", value: "YOUR_API_KEY", description: "The public WhiteBIT API key" },
  { header: "X-TXC-PAYLOAD", value: "base64_encoded_payload", description: "Base64-encoded request body" },
  { header: "X-TXC-SIGNATURE", value: "signature", description: "HMAC-SHA512 signature (hex encoded)" },
];

export const keyConstraints = {
  maxIps: 50,
  inactivityDeactivationDays: 14,
  requires2FA: true,
  separateKeysPerApp: true,
};

export const permissionLevels = [
  { name: "Info + Trading", description: "Read account info, place/cancel orders, view history" },
  { name: "Info + Trading + Deposit + Withdraw", description: "All of the above, plus deposit address generation and withdrawal creation" },
];

export const nonce = {
  type: "incrementing integer",
  recommendation: "Unix timestamp in milliseconds",
  nonceWindow: {
    enabled: "optional boolean",
    tolerance: "±5 seconds of server time",
    uniqueness: "Each nonce must be unique to prevent double processing",
  },
};
