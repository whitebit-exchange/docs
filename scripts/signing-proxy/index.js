#!/usr/bin/env node
/**
 * CORS relay proxy for the WhiteBIT docs playground.
 *
 * The browser signer computes X-TXC-PAYLOAD and X-TXC-SIGNATURE locally;
 * this proxy only adds CORS headers so the browser can reach whitebit.com.
 *
 * Usage: node scripts/signing-proxy/index.js [PORT]
 * Default port: 3001
 *
 * No external dependencies — built-in http/https only.
 */

const http = require("http");
const https = require("https");
const { URL } = require("url");

const PORT = parseInt(process.env.PORT || process.argv[2] || "3001", 10);
const TARGET_HOST = "whitebit.com";
const TARGET_BASE = `https://${TARGET_HOST}`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, X-TXC-APIKEY, X-TXC-PAYLOAD, X-TXC-SIGNATURE",
  "Access-Control-Max-Age": "86400",
};

const server = http.createServer((req, res) => {
  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  const targetUrl = new URL(req.url, TARGET_BASE);

  const options = {
    hostname: TARGET_HOST,
    port: 443,
    path: targetUrl.pathname + (targetUrl.search || ""),
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET_HOST,
    },
  };

  // Strip proxy-internal headers that shouldn't be forwarded
  delete options.headers["connection"];

  const proxyReq = https.request(options, (proxyRes) => {
    const responseHeaders = { ...CORS_HEADERS, ...proxyRes.headers };
    // Avoid duplicate CORS headers if whitebit.com also sends them
    res.writeHead(proxyRes.statusCode, responseHeaders);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    console.error("Proxy error:", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { ...CORS_HEADERS, "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Bad Gateway", detail: err.message }));
    }
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, () => {
  console.log(`WhiteBIT CORS relay running on http://localhost:${PORT}`);
  console.log(`Forwarding to ${TARGET_BASE}`);
});
