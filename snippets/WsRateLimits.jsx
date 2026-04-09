/**
 * Renders the rate limits section text for a WebSocket channel page.
 *
 * Props:
 *   connectionsPerMinute — number (e.g. 1000)
 *   requestsPerMinute   — number (e.g. 200)
 *
 * Used in MDX pages: <WsRateLimits {...channelMeta.rateLimits} />
 */
export const WsRateLimits = ({ connectionsPerMinute, requestsPerMinute }) => {
  return (
    <p>
      Standard connection-level rate limits apply: {connectionsPerMinute}{' '}
      connections per minute, {requestsPerMinute} requests per minute per
      connection.
    </p>
  );
};
