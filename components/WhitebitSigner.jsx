const { useState, useMemo } = React;

export const WhitebitSigner = ({
  path: defaultPath = "/api/v4/order/market",
  defaultParams = "{}",
  fields = null,
}) => {
  const getApiHost = () => {
    const sel =
      typeof document !== "undefined"
        ? document.querySelector('select[aria-label="Select base URL"]')
        : null;
    return sel?.options[sel.selectedIndex]?.text?.trim() || "https://whitebit.com";
  };

  const inputCls =
    "w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm font-mono outline-none focus:border-primary";
  const readOnlyCls =
    "w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1 text-sm font-mono outline-none text-gray-500 dark:text-gray-400 cursor-default select-all";

  const hex = (buf) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  const b64 = (s) => {
    const bytes = new TextEncoder().encode(s);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin);
  };

  const hmacSha512Hex = async (secret, msg) => {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"],
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(msg),
    );
    return hex(sig);
  };

  // ── Derived field lists ───────────────────────────────────────────────────

  const queryFields = fields
    ? fields.filter(function(f) { return f.paramIn === "query" || f.paramIn === "path"; })
    : [];
  const bodyFields = fields
    ? fields.filter(function(f) { return !f.paramIn || f.paramIn === "body"; })
    : [];

  // ── State ────────────────────────────────────────────────────────────────

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const [path, setPath] = useState(defaultPath);

  const initFieldValues = (fieldDefs) => {
    if (!fieldDefs) return {};
    const vals = {};
    for (const f of fieldDefs) {
      vals[f.name] = f.default !== undefined ? String(f.default) : "";
    }
    return vals;
  };

  const [fieldValues, setFieldValues] = useState(function() { return initFieldValues(fields); });
  const [showRaw, setShowRaw] = useState(false);
  const [params, setParams] = useState(defaultParams === "{}" ? "" : defaultParams);

  const [computed, setComputed] = useState(null);
  const [response, setResponse] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Structured mode: when fields array is provided (even empty) and not in raw JSON view
  const useFieldsMode = fields !== null && fields !== undefined && !showRaw;

  // ── Handlers ─────────────────────────────────────────────────────────────

  const setFieldValue = (name, value) =>
    setFieldValues(function(prev) { return { ...prev, [name]: value }; });

  const toggleRaw = () => {
    if (fields === null || fields === undefined) return;
    if (!showRaw) {
      const obj = {};
      for (const f of bodyFields) {
        const val = fieldValues[f.name];
        if (val !== "" && val !== null && val !== undefined) {
          obj[f.name] =
            f.type === "integer" || f.type === "number" ? Number(val) : val;
        }
      }
      setParams(Object.keys(obj).length ? JSON.stringify(obj, null, 2) : "");
      setShowRaw(true);
    } else {
      try {
        const parsed = JSON.parse(params.trim() || "{}");
        const next = { ...fieldValues };
        for (const f of bodyFields) {
          if (parsed[f.name] !== undefined) next[f.name] = String(parsed[f.name]);
        }
        setFieldValues(next);
      } catch (e) {
        // ignore parse error — keep current field values
      }
      setShowRaw(false);
    }
  };

  // ── Core signing ─────────────────────────────────────────────────────────

  const compute = async () => {
    setError("");
    setComputed(null);
    setResponse(null);
    try {
      if (!apiKey.trim()) throw new Error("API key is required");
      if (!apiSecret.trim()) throw new Error("API secret is required");

      let extraBodyParams = {};
      let queryString = "";

      if (useFieldsMode) {
        const qParams = {};
        for (const f of fields) {
          const val = fieldValues[f.name];
          const empty = val === "" || val === null || val === undefined;
          if (empty) {
            if (f.required) throw new Error('"' + f.name + '" is required');
            continue;
          }
          if (f.paramIn === "query" || f.paramIn === "path") {
            qParams[f.name] = String(val);
          } else {
            if (f.type === "integer" || f.type === "number") {
              const num = Number(val);
              if (isNaN(num)) throw new Error('"' + f.name + '" must be a number');
              extraBodyParams[f.name] = num;
            } else {
              extraBodyParams[f.name] = val;
            }
          }
        }
        if (Object.keys(qParams).length > 0) {
          queryString =
            "?" +
            Object.entries(qParams)
              .map(function(kv) { return encodeURIComponent(kv[0]) + "=" + encodeURIComponent(kv[1]); })
              .join("&");
        }
      } else if (params.trim()) {
        try {
          extraBodyParams = JSON.parse(params.trim());
        } catch (e) {
          throw new Error("Body params is not valid JSON");
        }
      }

      const bodyObj = {
        request: path,
        nonce: Date.now(),
        nonceWindow: true,
      };
      for (const k in extraBodyParams) bodyObj[k] = extraBodyParams[k];

      const bodyStr = JSON.stringify(bodyObj);
      const payload = b64(bodyStr);
      const signature = await hmacSha512Hex(apiSecret.trim(), payload);

      const result = { payload, signature, bodyStr, queryString };
      setComputed(result);
      return result;
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
      return null;
    }
  };

  const send = async () => {
    setBusy(true);
    setResponse(null);
    try {
      const out = await compute();
      if (!out) return;

      const res = await fetch("/_mintlify/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "post",
          url: getApiHost() + path + out.queryString,
          header: {
            "content-type": "application/json",
            "X-TXC-APIKEY": apiKey.trim(),
            "X-TXC-PAYLOAD": out.payload,
            "X-TXC-SIGNATURE": out.signature,
          },
          body: JSON.parse(out.bodyStr),
          cookie: {},
          query: {},
        }),
      });

      const text = await res.text();
      let status = res.status;
      let pretty = text;
      try {
        const json = JSON.parse(text);
        if (json.statusCode !== undefined) {
          status = json.statusCode;
          const raw =
            typeof json.body === "string"
              ? json.body
              : JSON.stringify(json.body);
          try {
            pretty = JSON.stringify(JSON.parse(raw), null, 2);
          } catch (e2) {
            pretty = raw;
          }
        } else {
          pretty = JSON.stringify(json, null, 2);
        }
      } catch (e2) {
        // leave pretty as raw text
      }
      setResponse({ status, body: pretty });
    } catch (e) {
      setError(e && e.message ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const copy = (text) => {
    if (navigator && navigator.clipboard) navigator.clipboard.writeText(text);
  };

  const headerRows = useMemo(function () {
    if (!computed) return [];
    return [
      { key: "X-TXC-APIKEY", value: apiKey.trim(), readOnly: false },
      { key: "X-TXC-PAYLOAD", value: computed.payload, readOnly: true },
      { key: "X-TXC-SIGNATURE", value: computed.signature, readOnly: true },
    ];
  }, [computed, apiKey]);

  // ── Field renderer ────────────────────────────────────────────────────────

  const renderField = function(f) {
    return (
      <div key={f.name}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
            {f.name}
          </span>
          {f.required ? (
            <span className="text-xs text-red-500">required</span>
          ) : (
            <span className="text-xs text-gray-400">optional</span>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            {f.type}{f.enum ? " · enum" : ""}
          </span>
        </div>
        {f.enum ? (
          <select
            className={inputCls}
            value={fieldValues[f.name] || ""}
            onChange={function(e){ setFieldValue(f.name, e.target.value); }}
          >
            {!f.required && <option value="">— leave empty —</option>}
            {f.enum.map(function(v) {
              return <option key={v} value={v}>{v}</option>;
            })}
          </select>
        ) : (
          <input
            type={f.type === "integer" || f.type === "number" ? "number" : "text"}
            className={inputCls}
            value={fieldValues[f.name] || ""}
            onChange={function(e){ setFieldValue(f.name, e.target.value); }}
            placeholder={f.example !== undefined ? String(f.example) : (f.required ? f.name : "optional")}
            spellCheck={false}
            autoComplete="off"
          />
        )}
        {f.description ? (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {f.description}
          </div>
        ) : null}
      </div>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/40">

      <div className="flex items-baseline justify-between mb-3">
        <div className="text-sm font-semibold">Try this request</div>
        <div className="text-xs text-gray-500">
          signs via <code className="font-mono">crypto.subtle</code>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        <label className="block">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            API key (X-TXC-APIKEY)
          </span>
          <input
            className={inputCls}
            value={apiKey}
            onChange={function(e){ setApiKey(e.target.value); }}
            placeholder="your-api-key"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            API secret
          </span>
          <div className="flex gap-2">
            <input
              type={showSecret ? "text" : "password"}
              className={inputCls}
              value={apiSecret}
              onChange={function(e){ setApiSecret(e.target.value); }}
              placeholder="your-api-secret"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={function(){ setShowSecret(function(v){ return !v; }); }}
              className="text-xs px-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shrink-0"
            >
              {showSecret ? "hide" : "show"}
            </button>
          </div>
        </label>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Credentials stay in memory only — never written to localStorage or cookies.
      </div>

      <label className="block mb-3">
        <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Endpoint path
        </span>
        <input
          className={inputCls}
          value={path}
          onChange={function(e){ setPath(e.target.value); }}
          spellCheck={false}
          placeholder="/api/v4/..."
        />
      </label>

      <div className="mb-3">

        {/* Query / path parameters */}
        {queryFields.length > 0 && (
          <div className="mb-3">
            <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Query parameters
            </span>
            <div className="space-y-2">
              {queryFields.map(renderField)}
            </div>
          </div>
        )}

        {/* Body parameters */}
        {useFieldsMode ? (
          <div>
            {bodyFields.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Request parameters
                  </span>
                  <button
                    type="button"
                    onClick={toggleRaw}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                  >
                    Edit as JSON
                  </button>
                </div>
                <div className="space-y-2">
                  {bodyFields.map(renderField)}
                  <div className="text-xs text-gray-400 dark:text-gray-500 pt-1">
                    request, nonce, nonceWindow added automatically.
                  </div>
                </div>
              </div>
            )}
            {bodyFields.length === 0 && queryFields.length === 0 && (
              <div className="text-xs text-gray-400 dark:text-gray-500">
                No parameters required. request, nonce, nonceWindow added automatically.
              </div>
            )}
            {bodyFields.length === 0 && queryFields.length > 0 && (
              <div className="text-xs text-gray-400 dark:text-gray-500">
                request, nonce, nonceWindow added automatically.
              </div>
            )}
          </div>
        ) : (
          /* Raw JSON / legacy mode */
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Request body (JSON)
              </span>
              {fields !== null && fields !== undefined && bodyFields.length > 0 && (
                <button
                  type="button"
                  onClick={toggleRaw}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                >
                  Form fields
                </button>
              )}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              request, nonce, nonceWindow added automatically.
            </div>
            <textarea
              className={inputCls + " min-h-20"}
              rows={4}
              value={params}
              onChange={function(e){ setParams(e.target.value); }}
              placeholder='{ "market": "BTC_USDT" }'
              spellCheck={false}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={compute}
          disabled={busy}
          className="px-3 py-1.5 text-sm rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 disabled:opacity-50"
        >
          Compute headers
        </button>
        <button
          type="button"
          onClick={send}
          disabled={busy}
          className="px-3 py-1.5 text-sm rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {busy ? "Sending…" : "Send request"}
        </button>
      </div>

      {error ? (
        <div className="text-sm text-red-600 dark:text-red-400 mb-3 break-words">{error}</div>
      ) : null}

      {computed ? (
        <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 mb-3">
          <div className="text-xs font-semibold mb-2">Computed headers</div>
          {headerRows.map(function(row) {
            return (
              <div key={row.key} className="flex gap-2 items-start mb-1 last:mb-0">
                <span className="text-xs font-mono text-gray-500 w-36 shrink-0 pt-0.5">
                  {row.key}
                </span>
                <div className="flex-1 min-w-0">
                  <input
                    readOnly
                    value={row.value}
                    placeholder={row.readOnly ? "auto-computed" : ""}
                    className={row.readOnly ? readOnlyCls : inputCls}
                    title={row.readOnly ? "Auto-computed" : undefined}
                  />
                  {row.readOnly ? (
                    <div className="text-xs text-gray-400 mt-0.5">auto-computed</div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={function(){ copy(row.value); }}
                  className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shrink-0"
                >
                  copy
                </button>
              </div>
            );
          })}
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer">full request body</summary>
            <pre className="text-xs font-mono whitespace-pre-wrap break-all mt-1 m-0">
              {(function() {
                try { return JSON.stringify(JSON.parse(computed.bodyStr), null, 2); }
                catch(e) { return computed.bodyStr; }
              })()}
            </pre>
          </details>
          {computed.queryString ? (
            <div className="mt-2 text-xs text-gray-500 font-mono">
              query string: {computed.queryString}
            </div>
          ) : null}
        </div>
      ) : null}

      {response ? (
        <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
          <div className="text-xs font-semibold mb-2">
            Response{" "}
            <span className={response.status < 400 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              HTTP {response.status}
            </span>
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-80 m-0">
            {response.body}
          </pre>
        </div>
      ) : null}

    </div>
  );
};
