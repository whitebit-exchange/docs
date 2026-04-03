import { useState, useEffect } from 'react';

export const WsSubscribeSteps = ({
  subscribe,
  confirmation,
  update,
  unsubscribe,
  subscribeNote,
  updateNote,
  updateExtra,
}) => {
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

  const TOKEN_COLORS = isDark ? {
    key:         '#79c0ff',
    string:      '#a5d6ff',
    number:      '#e3b341',
    boolean:     '#ff7b72',
    null:        '#8b949e',
    punctuation: '#c9d1d9',
    ws:          '#c9d1d9',
  } : {
    key:         '#0550ae',
    string:      '#0a3069',
    number:      '#953800',
    boolean:     '#cf222e',
    null:        '#6e7781',
    punctuation: '#24292f',
    ws:          '#24292f',
  };

  const tokenize = (json) => {
    const tokens = [];
    let i = 0;
    while (i < json.length) {
      if (/\s/.test(json[i])) {
        let ws = '';
        while (i < json.length && /\s/.test(json[i])) ws += json[i++];
        tokens.push({ type: 'ws', value: ws });
        continue;
      }
      if (json[i] === '"') {
        let str = '"'; i++;
        while (i < json.length) {
          if (json[i] === '\\') { str += json[i] + json[i + 1]; i += 2; }
          else if (json[i] === '"') { str += '"'; i++; break; }
          else str += json[i++];
        }
        let j = i;
        while (j < json.length && /[ \t]/.test(json[j])) j++;
        tokens.push({ type: json[j] === ':' ? 'key' : 'string', value: str });
        continue;
      }
      if (json[i] === '-' || /\d/.test(json[i])) {
        let num = '';
        if (json[i] === '-') num += json[i++];
        while (i < json.length && /[\d.eE+\-]/.test(json[i])) num += json[i++];
        tokens.push({ type: 'number', value: num });
        continue;
      }
      if (json.slice(i, i + 4) === 'true')  { tokens.push({ type: 'boolean', value: 'true'  }); i += 4; continue; }
      if (json.slice(i, i + 5) === 'false') { tokens.push({ type: 'boolean', value: 'false' }); i += 5; continue; }
      if (json.slice(i, i + 4) === 'null')  { tokens.push({ type: 'null',    value: 'null'  }); i += 4; continue; }
      tokens.push({ type: 'punctuation', value: json[i++] });
    }
    return tokens;
  };

  const JsonBlock = ({ data }) => {
    const json = JSON.stringify(data, null, 2);
    const tokens = tokenize(json);
    return (
      <div
        className="border border-gray-200 dark:border-[#30363d]"
        style={{ borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '0.75rem' }}
      >
        <div
          className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] text-gray-500 dark:text-[#8b949e]"
          style={{
            padding: '0.25rem 1rem',
            fontSize: '0.7rem',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          json
        </div>
        <div
          className="bg-white dark:bg-[#0d1117]"
          style={{
            margin: 0,
            padding: '0.875rem 1.125rem',
            overflowX: 'auto',
            fontSize: '0.8125rem',
            lineHeight: '1.65',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
            whiteSpace: 'pre',
          }}
        >
          {tokens.map((t, idx) => (
            <span key={idx} style={{ color: TOKEN_COLORS[t.type] }}>{t.value}</span>
          ))}
        </div>
      </div>
    );
  };

  const CIRCLE = 32;

  const WsStep = ({ number, title, isLast, children }) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: CIRCLE }}>
        <div
          className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          style={{
            width: CIRCLE, height: CIRCLE,
            borderRadius: '50%',
            border: '1.5px solid',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8125rem', fontWeight: 600, flexShrink: 0,
          }}
        >
          {number}
        </div>
        {!isLast && (
          <div
            className="bg-gray-200 dark:bg-gray-700"
            style={{ width: 2, flex: 1, minHeight: '1.5rem' }}
          />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? '0.5rem' : '1.75rem', paddingTop: '4px', minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '1rem', margin: '0 0 0.75rem 0', lineHeight: `${CIRCLE}px` }}>
          {title}
        </p>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ margin: '1.25rem 0' }}>
      <WsStep number={1} title="Send subscription request">
        {subscribeNote && <p style={{ margin: '0 0 0.75rem 0' }}>{subscribeNote}</p>}
        <JsonBlock data={subscribe} />
      </WsStep>

      <WsStep number={2} title="Receive confirmation">
        <JsonBlock data={confirmation} />
      </WsStep>

      <WsStep number={3} title="Receive real-time updates">
        {updateNote && <p style={{ margin: '0 0 0.75rem 0' }}>{updateNote}</p>}
        <JsonBlock data={update} />
        {updateExtra}
      </WsStep>

      <WsStep number={4} title="Unsubscribe" isLast>
        <JsonBlock data={unsubscribe} />
      </WsStep>
    </div>
  );
};
