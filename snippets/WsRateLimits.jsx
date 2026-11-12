/**
 * Renders the rate limits section text for a WebSocket channel page.
 *
 * Props:
 *   connectionsPerMinute        — number (e.g. 1000)
 *   orderPlacementsPer10Seconds — number (e.g. 10000), present on order-placement methods
 *   requestsPer10Seconds        — number (e.g. 12000), present on all other channels
 *   scope                       — 'account' on order-management pages: states the request
 *                                 budget and that it is counted per account, shared by the
 *                                 main account and all sub-accounts across every connection.
 *                                 Omitted on stream pages: the generic connection-level text renders.
 *
 * Used in MDX pages: <WsRateLimits {...channelMeta.rateLimits} />
 *                    <WsRateLimits {...channelMeta.rateLimits} scope="account" />
 */
export const WsRateLimits = ({ connectionsPerMinute, orderPlacementsPer10Seconds, requestsPer10Seconds, scope }) => {
  if (scope === 'account') {
    const isPlacement = orderPlacementsPer10Seconds !== undefined;
    const budget = isPlacement ? orderPlacementsPer10Seconds : requestsPer10Seconds;
    const subject = isPlacement ? 'Order placements are' : 'Requests other than order placements are';
    return (
      <p>
        {budget !== undefined && `${subject} limited to ${budget.toLocaleString('en-US')} per 10 seconds per account. `}
        The main account and all its sub-accounts share the budget across every connection. See{' '}
        <a href="/websocket/rate-limits">WebSocket Rate Limits</a> for connection limits and error codes.
      </p>
    );
  }
  return (
    <p>
      Standard connection-level rate limits apply. See{' '}
      <a href="/websocket/rate-limits">WebSocket Rate Limits</a> for details.
    </p>
  );
};
