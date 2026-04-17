import { useState, useEffect } from 'react';

/**
 * Generic table component for concept data (rate limits, error codes, auth headers, etc.).
 *
 * Props:
 *   title?       — optional heading above the table
 *   columns      — array of { key, header, width? } defining visible columns
 *   rows         — array of objects (keys must match column.key)
 *   codeColumns? — array of column keys to render in monospace (e.g., ["endpoint", "header"])
 *
 * Usage:
 *   import { ConceptTable } from '/snippets/ConceptTable.jsx';
 *   import { scopeLimits } from '/snippets/concept-data/rate-limits.jsx';
 *
 *   <ConceptTable
 *     title="REST API rate limits"
 *     columns={[
 *       { key: 'scope', header: 'Scope' },
 *       { key: 'limit', header: 'Limit' },
 *       { key: 'period', header: 'Period' },
 *     ]}
 *     rows={scopeLimits}
 *     codeColumns={['scope']}
 *   />
 */
export const ConceptTable = ({ title, columns, rows, codeColumns = [] }) => {
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  );

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const T = isDark ? {
    border:       '#374151',
    borderSubtle: '#1f2937',
    headerBg:     '#1f2937',
    headerText:   '#9ca3af',
    titleBg:      '#1f2937',
    titleText:    '#d1d5db',
    codeBg:       '#374151',
    codeText:     '#e5e7eb',
    cellText:     '#d1d5db',
  } : {
    border:       '#e5e7eb',
    borderSubtle: '#f3f4f6',
    headerBg:     '#f9fafb',
    headerText:   '#6b7280',
    titleBg:      '#f9fafb',
    titleText:    '#374151',
    codeBg:       '#f3f4f6',
    codeText:     '#1f2937',
    cellText:     '#374151',
  };

  const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

  const codeSet = new Set(codeColumns);

  const gridTemplateColumns = columns
    .map((col) => col.width || '1fr')
    .join(' ');

  const HEADER = {
    padding: '0.5rem 1rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    color: T.headerText,
    backgroundColor: T.headerBg,
    borderBottom: `1px solid ${T.border}`,
  };

  const CELL = {
    padding: '0.625rem 1rem',
    fontSize: '0.8125rem',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    color: T.cellText,
  };

  return (
    <div style={{ margin: '1.25rem 0', borderRadius: '0.5rem', border: `1px solid ${T.border}`, overflow: 'hidden', fontSize: '0.8125rem' }}>
      {title && (
        <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em', backgroundColor: T.titleBg, borderBottom: `1px solid ${T.border}`, color: T.titleText }}>
          {title}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns, width: '100%', overflowX: 'auto' }}>

        {columns.map((col) => (
          <div key={col.key} style={HEADER}>{col.header}</div>
        ))}

        {rows.map((row, i) => {
          const borderTop = `1px solid ${i === 0 ? T.border : T.borderSubtle}`;

          return columns.map((col) => {
            const value = row[col.key];
            const isCode = codeSet.has(col.key);
            const display = value != null ? String(value) : '—';

            return (
              <div key={`${i}-${col.key}`} style={{ ...CELL, borderTop }}>
                {isCode ? (
                  <span style={{
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontFamily: MONO,
                    backgroundColor: T.codeBg,
                    color: T.codeText,
                    whiteSpace: 'nowrap',
                  }}>
                    {display}
                  </span>
                ) : (
                  display
                )}
              </div>
            );
          });
        })}

      </div>
    </div>
  );
};
