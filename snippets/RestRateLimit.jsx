/**
 * Renders a rate limit notice for a REST API endpoint page.
 *
 * Props:
 *   requests — number (e.g. 20000)
 *   period   — string (e.g. "10 seconds")
 *   scope    — optional string describing which path group (e.g. "/api/v4/public/*")
 */
export const RestRateLimit = ({ requests, period = '10 seconds', scope }) => {
  const formatted = requests.toLocaleString();
  return (
    <p>
      Rate limit: <code>{formatted}</code> requests per {period}
      {scope && <> (applies to all <code>{scope}</code> endpoints)</>}.
      Exceeding this limit returns HTTP <code>429</code>.
      See <a href="/api-reference/rate-limits">Rate limits</a> for details and
      best practices.
    </p>
  );
};
