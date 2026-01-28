// Mintlify provides React globally
const { useState, useEffect, useRef } = React;

export const ApiMonitorTable = () => {
  const [logs, setLogs] = useState(() => {
    // Generate initial dummy entries
    const dummyLogs = [];
    const endpoints = [
      "/api/v4/order/market",
      "/api/v4/order/new",
      "/api/v4/order/cancel",
      "/api/v4/order/stop-limit",
      "/api/v4/order/collateral/limit",
      "/api/v4/order/collateral/market",
      "/api/v4/order/collateral/trigger-market",
      "/api/v4/order/collateral/stop-limit",
    ];

    const markets = [
      "BTC_USDT",
      "ETH_USDT",
      "BTC_PERP",
      "ETH_PERP",
      "WBT_USDT",
    ];
    const sides = ["buy", "sell"];

    const now = Date.now();
    for (let i = 0; i < 10; i++) {
      const randomEndpoint =
        endpoints[Math.floor(Math.random() * endpoints.length)];
      const randomMarket = markets[Math.floor(Math.random() * markets.length)];
      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      const randomAmount = (Math.random() * 5).toFixed(6);
      const randomOrderId = Math.floor(Math.random() * 1000000000);

      const timestamp = new Date(now - i * 150).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });

      dummyLogs.push({
        id: now - i * 150,
        time: timestamp,
        code: 200,
        endpoint: randomEndpoint,
        action: randomSide.toUpperCase(),
        payload: `{"market":"${randomMarket}","side":"${randomSide}","amount":"${randomAmount}","orderId":"${randomOrderId}"}`,
      });
    }

    return dummyLogs;
  });

  const intervalRef = useRef(null);

  const endpoints = [
    "/api/v4/order/market",
    "/api/v4/order/new",
    "/api/v4/order/cancel",
    "/api/v4/order/stop-limit",
    "/api/v4/order/collateral/limit",
    "/api/v4/order/collateral/market",
    "/api/v4/order/collateral/trigger-market",
    "/api/v4/order/collateral/stop-limit",
  ];

  const markets = [
    "BTC_USDT",
    "ETH_USDT",
    "BTC_PERP",
    "ETH_PERP",
    "WBT_USDT",
    "SOL_USDT",
    "DOGE_USDT",
  ];
  const sides = ["buy", "sell"];

  const generateRandomLog = () => {
    const randomEndpoint =
      endpoints[Math.floor(Math.random() * endpoints.length)];
    const randomMarket = markets[Math.floor(Math.random() * markets.length)];
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    const randomAmount = (Math.random() * 5).toFixed(6);
    const randomOrderId = Math.floor(Math.random() * 1000000000);

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });

    const newLog = {
      id: Date.now(),
      time: timestamp,
      code: 200,
      endpoint: randomEndpoint,
      action: randomSide.toUpperCase(),
      payload: `{"market":"${randomMarket}","side":"${randomSide}","amount":"${randomAmount}","orderId":"${randomOrderId}"}`,
    };

    setLogs((prev) => [newLog, ...prev].slice(0, 50));
  };

  useEffect(() => {
    // Generate new log every 150ms
    intervalRef.current = setInterval(generateRandomLog, 150);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg border border-gray-700"
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        marginTop: 40,
        marginBottom: 50,
      }}
    >
      <div
        className="overflow-y-auto overflow-x-auto"
        style={{ backgroundColor: "#1a1d23", maxHeight: "420px" }}
      >
        <table
          className="w-full border-collapse"
          style={{ tableLayout: "auto", margin: 0 }}
        >
          <thead
            className="sticky top-0 z-10"
            style={{ backgroundColor: "#252830" }}
          >
            <tr>
              <th
                className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700"
                style={{ minWidth: "150px", padding: "12px 20px 12px 20px" }}
              >
                Time
              </th>
              <th
                className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700"
                style={{ minWidth: "80px", padding: "12px 16px" }}
              >
                Code
              </th>
              <th
                className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700"
                style={{ minWidth: "280px", padding: "12px 16px" }}
              >
                Endpoint
              </th>
              <th
                className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700"
                style={{ minWidth: "60px", padding: "12px 8px" }}
              ></th>
              <th
                className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700"
                style={{ minWidth: "200px", padding: "12px 16px" }}
              >
                Payload
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                style={{
                  animation: index === 0 ? "slideIn 0.3s ease-out" : "none",
                }}
              >
                <td
                  className="text-sm text-gray-400"
                  style={{
                    minWidth: "150px",
                    padding: "10px 20px 10px 20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {log.time}
                </td>
                <td
                  className="text-sm"
                  style={{
                    minWidth: "80px",
                    padding: "10px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className={`font-semibold ${log.code === 200 ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {log.code}
                  </span>
                </td>
                <td
                  className="text-sm text-gray-300"
                  style={{
                    minWidth: "280px",
                    maxWidth: "350px",
                    padding: "10px 16px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {log.endpoint}
                </td>
                <td
                  className="text-sm"
                  style={{
                    minWidth: "60px",
                    padding: "10px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className={`font-bold uppercase text-xs ${log.action === "BUY" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td
                  className="text-sm text-gray-400"
                  style={{
                    minWidth: "200px",
                    maxWidth: "500px",
                    padding: "10px 16px",
                  }}
                >
                  <div
                    className="font-mono text-xs"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {log.payload}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #1a1d23;
        }

        div::-webkit-scrollbar-thumb {
          background: #3a3f4b;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #4a4f5b;
        }
      `}</style>
    </div>
  );
};
