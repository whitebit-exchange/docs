/**
 * Brief regional-restriction notice for order-create endpoint pages.
 *
 * Available order types and execution flags depend on the account's region.
 * A request for an order type, flag, or BBO role unavailable in the active
 * region is rejected with HTTP 453. The full rules live on the concept page.
 *
 * Usage:
 *   import { RegionalRestrictionNote } from '/snippets/RegionalRestrictionNote.jsx';
 *   <RegionalRestrictionNote />
 */
export const RegionalRestrictionNote = () => (
  <Note>
    Available order types and execution flags depend on your region. A request
    for an order type or flag not available in your region is rejected with HTTP
    status <code>453</code>. See all details in{' '}
    <a href="/concepts/order-types#regional-restrictions">
      Order types — Regional restrictions
    </a>
    .
  </Note>
);
