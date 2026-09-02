/**
 * Renders the rate limits section text for a WebSocket channel page.
 *
 * Props:
 *   connectionsPerMinute        — number (e.g. 1000)
 *   orderPlacementsPer10Seconds — number (e.g. 10000), present on order-placement methods
 *   requestsPer10Seconds        — number (e.g. 12000), present on all other channels
 *
 * Used in MDX pages: <WsRateLimits {...channelMeta.rateLimits} />
 */
export const WsRateLimits = ({ connectionsPerMinute, orderPlacementsPer10Seconds, requestsPer10Seconds }) => {
  return (
    <p>
      Standard connection-level rate limits apply. See{' '}
      <a href="/websocket/rate-limits">WebSocket Rate Limits</a> for details.
    </p>
  );
};
