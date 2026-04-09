/**
 * Renders the authentication status for a WebSocket channel page.
 *
 * Props:
 *   required — boolean: true for private channels, false for public
 *
 * Used in MDX pages: <WsAuthBadge required={channelMeta.authRequired} />
 */
export const WsAuthBadge = ({ required }) => {
  if (!required) {
    return (
      <p><strong>Authentication:</strong> None. No authentication required.</p>
    );
  }

  return (
    <div>
      <Warning>
        This is a private channel.{' '}
        <a href="/websocket/authentication">Authorize</a> the WebSocket
        connection before subscribing.
      </Warning>
      <p>
        <strong>Authentication:</strong> Required.{' '}
        <a href="/websocket/authentication">Authorize</a> the WebSocket
        connection before subscribing.
      </p>
    </div>
  );
};
