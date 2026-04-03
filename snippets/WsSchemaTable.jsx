import { useState, useEffect } from 'react';

export const WsSchemaTable = ({ title, fields }) => {
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
    border:        '#374151',
    borderSubtle:  '#1f2937',
    headerBg:      '#1f2937',
    headerText:    '#9ca3af',
    titleBg:       '#1f2937',
    titleText:     '#d1d5db',
    fieldBg:       '#374151',
    fieldText:     '#e5e7eb',
    reqYes:        '#f3f4f6',
    reqNo:         '#4b5563',
    descText:      '#9ca3af',
    emptyText:     '#4b5563',
    enumBg:        'rgb(120 53 15 / 0.3)',
    enumText:      '#fbbf24',
  } : {
    border:        '#e5e7eb',
    borderSubtle:  '#f3f4f6',
    headerBg:      '#f9fafb',
    headerText:    '#6b7280',
    titleBg:       '#f9fafb',
    titleText:     '#374151',
    fieldBg:       '#f3f4f6',
    fieldText:     '#1f2937',
    reqYes:        '#111827',
    reqNo:         '#d1d5db',
    descText:      '#6b7280',
    emptyText:     '#d1d5db',
    enumBg:        '#fffbeb',
    enumText:      '#92400e',
  };

  const TYPE_STYLE = isDark ? {
    string:  { backgroundColor: 'rgb(88 28 135 / 0.25)',  color: '#c084fc' },
    integer: { backgroundColor: 'rgb(154 52 18 / 0.25)',  color: '#fb923c' },
    number:  { backgroundColor: 'rgb(154 52 18 / 0.25)',  color: '#fb923c' },
    boolean: { backgroundColor: 'rgb(30 64 175 / 0.25)',  color: '#60a5fa' },
    array:   { backgroundColor: 'rgb(17 94 89 / 0.25)',   color: '#2dd4bf' },
    object:  { backgroundColor: 'rgb(55 65 81 / 0.4)',    color: '#9ca3af' },
    null:    { backgroundColor: 'rgb(55 65 81 / 0.4)',    color: '#9ca3af' },
  } : {
    string:  { backgroundColor: '#faf5ff', color: '#6b21a8' },
    integer: { backgroundColor: '#fff7ed', color: '#9a3412' },
    number:  { backgroundColor: '#fff7ed', color: '#9a3412' },
    boolean: { backgroundColor: '#eff6ff', color: '#1e40af' },
    array:   { backgroundColor: '#f0fdfa', color: '#115e59' },
    object:  { backgroundColor: '#f3f4f6', color: '#374151' },
    null:    { backgroundColor: '#f3f4f6', color: '#374151' },
  };

  const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

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
  };

  const hasRequired = fields.some((f) => f.required === true);
  const hasEnum     = fields.some((f) => f.enum && f.enum.length > 0);

  const gridTemplateColumns = [
    'minmax(120px, auto)',
    'minmax(70px, auto)',
    ...(hasRequired ? ['minmax(70px, auto)'] : []),
    ...(hasEnum     ? ['minmax(120px, auto)'] : []),
    '1fr',
  ].join(' ');

  return (
    <div style={{ margin: '1.25rem 0', borderRadius: '0.5rem', border: `1px solid ${T.border}`, overflow: 'hidden', fontSize: '0.8125rem' }}>
      {title && (
        <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em', backgroundColor: T.titleBg, borderBottom: `1px solid ${T.border}`, color: T.titleText }}>
          {title}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns, width: '100%', overflowX: 'auto' }}>

        <div style={HEADER}>Field</div>
        <div style={HEADER}>Type</div>
        {hasRequired && <div style={HEADER}>Required</div>}
        {hasEnum     && <div style={HEADER}>Values</div>}
        <div style={HEADER}>Description</div>

        {fields.map((f, i) => {
          const borderTop = `1px solid ${i === 0 ? T.border : T.borderSubtle}`;
          const typeStyle = TYPE_STYLE[f.type] || TYPE_STYLE.object;

          return [
            <div key={`${i}-n`} style={{ ...CELL, whiteSpace: 'nowrap', borderTop }}>
              <span style={{ padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontFamily: MONO, backgroundColor: T.fieldBg, color: T.fieldText }}>
                {f.name}
              </span>
            </div>,

            <div key={`${i}-t`} style={{ ...CELL, whiteSpace: 'nowrap', borderTop }}>
              <span style={{ padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.75rem', whiteSpace: 'nowrap', fontFamily: MONO, ...typeStyle }}>
                {f.type}
              </span>
            </div>,

            ...(hasRequired ? [
              <div key={`${i}-r`} style={{ ...CELL, borderTop, fontWeight: f.required ? 500 : 400, color: f.required ? T.reqYes : T.reqNo }}>
                {f.required ? 'Yes' : '—'}
              </div>,
            ] : []),

            ...(hasEnum ? [
              <div key={`${i}-e`} style={{ ...CELL, borderTop, flexWrap: 'wrap', gap: '0.25rem' }}>
                {f.enum && f.enum.length > 0
                  ? f.enum.map((v, j) => (
                      <span key={j} style={{ padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.75rem', whiteSpace: 'nowrap', fontFamily: MONO, backgroundColor: T.enumBg, color: T.enumText }}>
                        {String(v)}
                      </span>
                    ))
                  : <span style={{ color: T.emptyText }}>—</span>
                }
              </div>,
            ] : []),

            <div key={`${i}-d`} style={{ ...CELL, borderTop, color: T.descText }}>
              {f.description}
            </div>,
          ];
        })}

      </div>
    </div>
  );
};
