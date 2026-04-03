import { useState, useEffect } from 'react';

export const WsMessageExample = ({ data, title }) => {
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

  const COLORS = isDark ? {
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
        let str = '"';
        i++;
        while (i < json.length) {
          if (json[i] === '\\') {
            str += json[i] + json[i + 1];
            i += 2;
          } else if (json[i] === '"') {
            str += '"';
            i++;
            break;
          } else {
            str += json[i++];
          }
        }
        let j = i;
        while (j < json.length && /[ \t]/.test(json[j])) j++;
        const isKey = json[j] === ':';
        tokens.push({ type: isKey ? 'key' : 'string', value: str });
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

  const json = JSON.stringify(data, null, 2);
  const tokens = tokenize(json);

  return (
    <div style={{ marginBottom: '1rem' }}>
      {title && (
        <p style={{
          fontWeight: 600,
          fontSize: '0.875rem',
          marginTop: '1rem',
          marginBottom: '0.5rem',
        }}>
          {title}
        </p>
      )}
      <div
        className="border border-gray-200 dark:border-[#30363d]"
        style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden' }}
      >
        <div
          className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.375rem 1rem',
          }}
        >
          <span
            className="text-gray-500 dark:text-[#8b949e]"
            style={{
              fontSize: '0.75rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            json
          </span>
        </div>
        <div
          className="bg-white dark:bg-[#0d1117]"
          style={{
            margin: 0,
            padding: '1rem 1.25rem',
            overflowX: 'auto',
            fontSize: '0.8125rem',
            lineHeight: '1.7',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
            whiteSpace: 'pre',
          }}
        >
          {tokens.map((t, idx) => (
            <span key={idx} style={{ color: COLORS[t.type] }}>{t.value}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
