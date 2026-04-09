/**
 * Renders the error codes section content for a WebSocket channel page.
 *
 * Props:
 *   errorCodes — "standard" (string) or array of { code, message, description }
 *
 * Used in MDX pages: <WsErrorCodes errorCodes={channelMeta.errorCodes} />
 */
export const WsErrorCodes = ({ errorCodes }) => {
  if (Array.isArray(errorCodes)) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Message</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {errorCodes.map((err, i) => (
              <tr key={i}>
                <td><code>{err.code}</code></td>
                <td>{err.message}</td>
                <td>{err.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Standard WebSocket error codes apply. See <a href="/websocket/overview">WebSocket overview</a> for error code reference.
        </p>
      </div>
    );
  }

  return (
    <p>
      Standard WebSocket error codes apply. See <a href="/websocket/overview">WebSocket overview</a> for error code reference.
    </p>
  );
};
