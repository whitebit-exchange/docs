import { useState, useEffect } from 'react';

/**
 * Renders a table of positional (tuple/array) fields, typically used inside
 * WsSubscribeSteps → updateExtra to document indexed payload fields.
 *
 * Props:
 *   fields   — Array of { index, field, type, description, example?, enum?, enumLabels? }
 *   title    — Optional header label
 *
 * Generated data comes from snippets/ws-data/*.jsx (tupleFields exports).
 */
export const WsTupleTable = ({ title, fields }) => {
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
    indexText:    '#60a5fa',
    fieldText:    '#e5e7eb',
    fieldBg:      '#374151',
    descText:     '#9ca3af',
    exampleText:  '#d1d5db',
    exampleBg:    'rgb(55 65 81 / 0.4)',
    enumText:     '#fbbf24',
  } : {
    border:       '#e5e7eb',
    borderSubtle: '#f3f4f6',
    headerBg:     '#f9fafb',
    headerText:   '#6b7280',
    titleBg:      '#f9fafb',
    titleText:    '#374151',
    indexText:    '#2563eb',
    fieldText:    '#1f2937',
    fieldBg:      '#f3f4f6',
    descText:     '#6b7280',
    exampleText:  '#374151',
    exampleBg:    '#f3f4f6',
    enumText:     '#92400e',
  };

  const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

  const HEADER = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    color: T.headerText,
    backgroundColor: T.headerBg,
  };

  const CELL = {
    padding: '0.5rem 0.75rem',
    fontSize: '0.8125rem',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
  };

  const hasExample = fields.some((f) => f.example !== undefined);

  const gridTemplateColumns = [
    'minmax(60px, auto)',   // Index
    'minmax(100px, auto)',  // Field
    ...(hasExample ? ['minmax(140px, auto)'] : []),
    '1fr',                  // Description
  ].join(' ');

  /** Format description, appending enum labels if present. */
  function formatDesc(f) {
    if (f.enumLabels && typeof f.enumLabels === 'object') {
      const mapping = Object.entries(f.enumLabels)
        .map(([v, label]) => `${v} = ${label}`)
        .join(', ');
      return f.description ? `${f.description}. ${mapping}` : mapping;
    }
    if (f.enum && f.enum.length > 0 && f.description) {
      // Check if description already contains enum mapping (e.g. "Side: 1=sell, 2=buy")
      const hasMapping = f.enum.some((v) => f.description.includes(`${v}=`) || f.description.includes(`${v} =`));
      if (hasMapping) return f.description;
    }
    return f.description || '';
  }

  return (
    <div style={{ width: '100%', margin: '0.75rem 0', borderRadius: '0.5rem', border: `1px solid ${T.border}`, overflow: 'hidden', fontSize: '0.8125rem' }}>
      {title && (
        <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em', backgroundColor: T.titleBg, borderBottom: `1px solid ${T.border}`, color: T.titleText }}>
          {title}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns, width: '100%', overflowX: 'auto' }}>

        <div style={{ ...HEADER, borderBottom: `1px solid ${T.border}` }}>Index</div>
        <div style={{ ...HEADER, borderBottom: `1px solid ${T.border}` }}>Field</div>
        {hasExample && <div style={{ ...HEADER, borderBottom: `1px solid ${T.border}` }}>Example</div>}
        <div style={{ ...HEADER, borderBottom: `1px solid ${T.border}` }}>Description</div>

        {fields.map((f, i) => {
          const borderTop = i > 0 ? `1px solid ${T.borderSubtle}` : undefined;
          const desc = formatDesc(f);

          return [
            <div key={`${i}-i`} style={{ ...CELL, whiteSpace: 'nowrap', borderTop }}>
              <code style={{ fontFamily: MONO, fontSize: '0.75rem', color: T.indexText }}>[{f.index}]</code>
            </div>,

            <div key={`${i}-f`} style={{ ...CELL, whiteSpace: 'nowrap', borderTop }}>
              <span style={{ padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontFamily: MONO, backgroundColor: T.fieldBg, color: T.fieldText }}>
                {f.field}
              </span>
            </div>,

            ...(hasExample ? [
              <div key={`${i}-e`} style={{ ...CELL, whiteSpace: 'nowrap', borderTop }}>
                {f.example !== undefined ? (
                  <code style={{ fontFamily: MONO, fontSize: '0.75rem', backgroundColor: T.exampleBg, color: T.exampleText, padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
                    {f.example}
                  </code>
                ) : null}
              </div>,
            ] : []),

            <div key={`${i}-d`} style={{ ...CELL, borderTop, color: T.descText }}>
              {desc}
            </div>,
          ];
        })}

      </div>
    </div>
  );
};
