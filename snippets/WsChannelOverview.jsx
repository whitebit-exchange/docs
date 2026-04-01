// Mintlify provides React globally
const { } = React;

/**
 * WsChannelOverview
 *
 * Renders a compact operations table at the top of a WebSocket channel page.
 * Surfaces all methods and the send / respond / server-push distinction that
 * Mintlify's default AsyncAPI renderer hides inside collapsed accordions.
 *
 * Props
 * -----
 * operations: Array of {
 *   name     : string   — human label, e.g. "Subscribe"
 *   send     : string   — method name the client sends, e.g. "ordersPending_subscribe"
 *   receive  : string   — what the server responds with (plain text description)
 *   push     : string | null
 *              — method name + dash-separated description for server-initiated messages
 *                e.g. "ordersPending_update — real-time order change"
 *                null for operations that produce no pushed events
 * }
 */
export const WsChannelOverview = ({ operations }) => {
  const hasPush = operations.some((op) => op.push);

  return (
    <div
      style={{
        margin: "1.25rem 0",
        borderRadius: "0.5rem",
        border: "1px solid",
        overflow: "hidden",
        fontSize: "0.8125rem",
      }}
      className="border-gray-200 dark:border-gray-700"
    >
      <table
        className="w-full"
        style={{ margin: 0, borderCollapse: "collapse", tableLayout: "auto" }}
      >
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
            <Th>Operation</Th>
            <Th>
              <span style={{ color: "#16a34a" }}>→</span> You send
            </Th>
            <Th>← Server responds</Th>
            {hasPush && (
              <Th>
                <span style={{ color: "#2563eb" }}>⟵</span> Server pushes
              </Th>
            )}
          </tr>
        </thead>
        <tbody>
          {operations.map((op, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 dark:border-gray-800"
              style={{ borderBottom: i === operations.length - 1 ? "none" : undefined }}
            >
              {/* Operation name */}
              <td
                className="text-gray-900 dark:text-gray-100"
                style={{ padding: "0.625rem 1rem", fontWeight: 500, whiteSpace: "nowrap" }}
              >
                {op.name}
              </td>

              {/* Method the client sends */}
              <td style={{ padding: "0.625rem 1rem", whiteSpace: "nowrap" }}>
                <code
                  className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                  style={{
                    padding: "0.125rem 0.375rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {op.send}
                </code>
              </td>

              {/* What the server sends back synchronously */}
              <td
                className="text-gray-500 dark:text-gray-400"
                style={{ padding: "0.625rem 1rem" }}
              >
                {op.receive}
              </td>

              {/* Server-initiated push message (subscribe channels only) */}
              {hasPush && (
                <td style={{ padding: "0.625rem 1rem" }}>
                  {op.push ? (
                    <PushBadge value={op.push} />
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Internal helpers ─────────────────────────────────────────────────────── */

const Th = ({ children }) => (
  <th
    className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
    style={{
      padding: "0.5rem 1rem",
      fontSize: "0.6875rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </th>
);

/**
 * Renders a push method badge.
 * Accepts "method_name" or "method_name — description" format.
 */
const PushBadge = ({ value }) => {
  const dashIdx = value.indexOf(" — ");
  const method = dashIdx !== -1 ? value.slice(0, dashIdx) : value;
  const desc = dashIdx !== -1 ? value.slice(dashIdx + 3) : null;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", flexWrap: "wrap" }}>
      <code
        className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
        style={{
          padding: "0.125rem 0.375rem",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          whiteSpace: "nowrap",
        }}
      >
        {method}
      </code>
      {desc && (
        <span
          className="text-gray-500 dark:text-gray-400"
          style={{ fontSize: "0.75rem" }}
        >
          — {desc}
        </span>
      )}
    </span>
  );
};
