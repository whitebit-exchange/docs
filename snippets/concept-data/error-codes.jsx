// AUTO-GENERATED — do not edit manually.
// Source: data/error-codes.yaml
// Regenerate: node scripts/generate-concept-data.mjs
//
//   import { errorCodes, authErrors, depositStatusCodes, ... } from '/snippets/concept-data/error-codes.jsx'

export const errorCodes = [
  { code: 0, httpStatus: 422, meaning: "Validation failed", action: "Check the `errors` field for field-level details" },
  { code: 1, httpStatus: 422, meaning: "Currency not withdrawable", action: "Verify the asset is enabled for withdrawal via `GET /api/v4/public/assets`" },
  { code: 2, httpStatus: 422, meaning: "Invalid address", action: "Check the withdrawal address format for the target network" },
  { code: 3, httpStatus: 422, meaning: "Amount too small", action: "Check `minAmount` and `minTotal` via `GET /api/v4/public/markets`" },
  { code: 5, httpStatus: 422, meaning: "Not enough balance", action: "Check available balance before placing order or withdrawal" },
  { code: 6, httpStatus: 422, meaning: "Amount less than or equal to fee", action: "Increase the withdrawal amount to cover the network fee" },
  { code: 9, httpStatus: 422, meaning: "Address unavailable", action: "Cannot withdraw to own deposit address" },
  { code: 10, httpStatus: 422, meaning: "Market not found or disabled", action: "Verify the market name via `GET /api/v4/public/markets`" },
  { code: 37, httpStatus: 422, meaning: "IOC and post-only conflict", action: "`ioc: true` and `postOnly: true` cannot be used together" },
];

export const authErrors = [
  { message: "Payload not provided.", cause: "X-TXC-PAYLOAD header missing or empty", resolution: "Include the base64-encoded request body as X-TXC-PAYLOAD" },
  { message: "Too many requests.", cause: "Nonce value is not greater than previous request", resolution: "Use incrementing nonce values" },
  { message: "This action is unauthorized. Enable your key in API settings", cause: "Using a disabled API key", resolution: "Enable the key in API settings or check IP restrictions" },
  { message: "You don't have permission to use this endpoint.", cause: "Endpoint access is restricted", resolution: "Update endpoint access in API key settings" },
  { message: "Invalid payload", cause: "Payload does not match the decoded value", resolution: "Ensure proper base64 encoding of the request body" },
  { message: "Unauthorized request.", cause: "Request signed incorrectly", resolution: "Verify the signature creation process" },
  { message: "Nonce not provided.", cause: "Missing nonce in request body", resolution: "Include nonce in all requests" },
  { message: "Your nonce is more than 5 seconds lesser than the current nonce", cause: "Invalid timestamp when using nonceWindow", resolution: "Use current Unix timestamp in milliseconds" },
  { message: "Invalid nonceWindow.", cause: "nonceWindow is not a boolean", resolution: "Set nonceWindow to `true` or `false`" },
  { message: "Request not provided.", cause: "Missing request path in body", resolution: "Include the request path in all requests" },
];

export const depositStatusCodes = [
  { code: 27, name: "DEPOSIT_TRAVEL_RULE_FROZEN", meaning: "Deposit frozen — awaiting Travel Rule verification" },
  { code: 28, name: "DEPOSIT_TRAVEL_RULE_FROZEN_PROCESSING", meaning: "Deposit frozen — Travel Rule verification in progress" },
];

export const retryStrategies = [
  { errorType: "Rate limit (429)", retry: true, strategy: "Exponential backoff: start at 1s, double on each retry, cap at 30s. Add jitter to avoid thundering herd." },
  { errorType: "Authentication error", retry: false, strategy: "Fix the root cause: check API key validity, signature computation, and header names." },
  { errorType: "Validation error", retry: false, strategy: "Fix the request parameters. Read the `errors` field for field-level feedback. Do not retry the same request." },
  { errorType: "Insufficient balance", retry: false, strategy: "Check the account balance and wait for pending operations to settle before retrying." },
  { errorType: "Server error (5xx)", retry: true, strategy: "Exponential backoff. If persistent, check platform status or contact support." },
];
