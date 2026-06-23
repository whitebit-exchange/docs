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
    ? fields.filter(function (f) { return f.paramIn === "query" || f.paramIn === "path"; })
    : [];
  const bodyFields = fields
    ? fields.filter(function (f) { return !f.paramIn || f.paramIn === "body"; })
    : [];

  // ── State ────────────────────────────────────────────────────────────────

  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(true);
  const [paramsOpen, setParamsOpen] = useState(true);

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

  const [fieldValues, setFieldValues] = useState(function () { return initFieldValues(fields); });
  const [showRaw, setShowRaw] = useState(false);
  const [params, setParams] = useState(defaultParams === "{}" ? "" : defaultParams);

  const [computed, setComputed] = useState(null);
  const [response, setResponse] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);

  const useFieldsMode = fields !== null && fields !== undefined && !showRaw;

  // ── Handlers ─────────────────────────────────────────────────────────────

  const setFieldValue = (name, value) =>
    setFieldValues(function (prev) { return { ...prev, [name]: value }; });

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
        // ignore parse error
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
              .map(function (kv) { return encodeURIComponent(kv[0]) + "=" + encodeURIComponent(kv[1]); })
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
        // leave as raw text
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
      { key: "X-TXC-APIKEY", value: apiKey.trim() },
      { key: "X-TXC-PAYLOAD", value: computed.payload },
      { key: "X-TXC-SIGNATURE", value: computed.signature },
    ];
  }, [computed, apiKey]);

  // ── Style constants ───────────────────────────────────────────────────────

  const INPUT_CLS =
    "w-full rounded-xl border-standard px-3 py-2 text-sm font-mono bg-background-light dark:bg-background-dark outline-none focus:ring-1 focus:ring-[#3064E3]/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-white/20";

  const SECTION_CLS =
    "rounded-2xl border border-zinc-200 dark:border-zinc-800";

  const SECTION_BTN_CLS_OPEN =
    "flex w-full pt-3.5 pb-3 px-3.5 items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-t-2xl";

  const SECTION_BTN_CLS_CLOSED =
    "flex w-full pt-3.5 pb-3 px-3.5 items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-2xl";

  // ── Field renderer ────────────────────────────────────────────────────────

  const renderField = function (f) {
    return (
      <div key={f.name}>
        <div className="flex items-center gap-1.5 mb-1 mt-2.5">
          <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">{f.name}</span>
          {f.required
            ? <span className="text-xs text-red-500 dark:text-red-400">required</span>
            : <span className="text-xs text-gray-400 dark:text-gray-500">optional</span>
          }
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{f.type}{f.enum ? " · enum" : ""}</span>
        </div>
        {f.description && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{f.description}</div>
        )}
        {f.enum ? (
          <select
            className={INPUT_CLS}
            value={fieldValues[f.name] || ""}
            onChange={function (e) { setFieldValue(f.name, e.target.value); }}
          >
            {!f.required && <option value="">— leave empty —</option>}
            {f.enum.map(function (v) { return <option key={v} value={v}>{v}</option>; })}
          </select>
        ) : (
          <input
            type={f.type === "integer" || f.type === "number" ? "number" : "text"}
            className={INPUT_CLS}
            value={fieldValues[f.name] || ""}
            onChange={function (e) { setFieldValue(f.name, e.target.value); }}
            placeholder={f.example !== undefined ? String(f.example) : (f.required ? f.name : "optional")}
            spellCheck={false}
            autoComplete="off"
          />
        )}
      </div>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="not-prose my-6 flex w-full flex-col bg-background-light dark:bg-background-dark border-standard rounded-2xl p-1.5">

      {/* ── Top toggle bar ── */}
      <div
        className={
          "flex w-full items-center space-x-1.5 rounded-xl p-1.5 transition-colors border-standard " +
          (open ? "bg-gray-50 dark:bg-white/5" : "hover:bg-gray-50 dark:hover:bg-white/5")
        }
      >
        <button
          type="button"
          onClick={function () { setOpen(function (v) { return !v; }); }}
          className="rounded-lg font-bold px-1.5 py-0.5 text-xs leading-5 shrink-0 bg-blue-400/20 text-blue-700 dark:text-blue-400 cursor-pointer"
        >
          POST
        </button>

        <button
          type="button"
          onClick={function () { setOpen(function (v) { return !v; }); }}
          className="flex-1 min-w-0 text-sm font-mono text-gray-600 dark:text-gray-400 truncate text-left cursor-pointer"
        >
          {path}
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Copy URL */}
          <button
            type="button"
            title="Copy URL"
            onClick={function (e) {
              e.stopPropagation();
              var url = getApiHost() + path;
              if (navigator && navigator.clipboard) navigator.clipboard.writeText(url);
              setUrlCopied(true);
              setTimeout(function () { setUrlCopied(false); }, 1500);
            }}
            className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500 transition-colors"
          >
            {urlCopied ? (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 7L5 10L11 3" stroke="#2AB673" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="4.5" y="1.5" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 4.5H1.5A1 1 0 0 0 .5 5.5v6A1 1 0 0 0 1.5 12.5h6A1 1 0 0 0 8.5 11.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-[#2AB673]/10 text-[#2AB673] hidden sm:inline">
            Try it
          </span>

          <button
            type="button"
            onClick={function () { setOpen(function (v) { return !v; }); }}
            className="flex items-center justify-center cursor-pointer"
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-gray-400 dark:text-gray-500 transition-transform shrink-0"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M3 5.5L7 9L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Expanded body ── */}
      {open && (
        <div className="mt-1.5 space-y-1.5">

          {/* Authentication section */}
          <div className={SECTION_CLS}>
            <button
              type="button"
              onClick={function () { setAuthOpen(function (v) { return !v; }); }}
              className={authOpen ? SECTION_BTN_CLS_OPEN : SECTION_BTN_CLS_CLOSED}
            >
              <div className="flex items-center gap-x-1.5">
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="text-gray-400 dark:text-gray-500 transition-transform shrink-0"
                  style={{ transform: authOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <path d="M4 2.5L8 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">Authentication</span>
              </div>
            </button>
            {authOpen && (
              <div className="px-3.5 pb-3.5 pt-0 border-t border-zinc-100 dark:border-zinc-800/60">
                <div className="flex items-center gap-1.5 mb-1 mt-2.5">
                  <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">X-TXC-APIKEY</span>
                  <span className="text-xs text-red-500 dark:text-red-400">required</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">string</span>
                </div>
                <input
                  className={INPUT_CLS}
                  value={apiKey}
                  onChange={function (e) { setApiKey(e.target.value); }}
                  placeholder="your-api-key"
                  autoComplete="off"
                  spellCheck={false}
                />

                <div className="flex items-center gap-1.5 mb-1 mt-2.5">
                  <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">API secret</span>
                  <span className="text-xs text-red-500 dark:text-red-400">required</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">string</span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type={showSecret ? "text" : "password"}
                    className={INPUT_CLS + " flex-1"}
                    value={apiSecret}
                    onChange={function (e) { setApiSecret(e.target.value); }}
                    placeholder="your-api-secret"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={function () { setShowSecret(function (v) { return !v; }); }}
                    className="text-xs px-2.5 rounded-xl border-standard bg-background-light dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 shrink-0 transition-colors"
                  >
                    {showSecret ? "hide" : "show"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                  Credentials stay in memory only — never written to localStorage or cookies.
                </p>
              </div>
            )}
          </div>

          {/* Body section */}
          <div className={SECTION_CLS}>
            <button
              type="button"
              onClick={function () { setParamsOpen(function (v) { return !v; }); }}
              className={paramsOpen ? SECTION_BTN_CLS_OPEN : SECTION_BTN_CLS_CLOSED}
            >
              <div className="flex items-center gap-x-1.5">
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="text-gray-400 dark:text-gray-500 transition-transform shrink-0"
                  style={{ transform: paramsOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <path d="M4 2.5L8 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">Body</span>
              </div>
              {fields !== null && fields !== undefined && bodyFields.length > 0 && (
                <button
                  type="button"
                  onClick={function (e) { e.stopPropagation(); toggleRaw(); }}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline mr-1"
                >
                  {showRaw ? "form fields" : "edit as JSON"}
                </button>
              )}
            </button>
            {paramsOpen && (
              <div className="px-3.5 pb-3.5 pt-0 border-t border-zinc-100 dark:border-zinc-800/60">
                {queryFields.length > 0 && (
                  <div className="mb-1">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 mt-2.5">Query parameters</p>
                    {queryFields.map(renderField)}
                  </div>
                )}

                {useFieldsMode ? (
                  bodyFields.length > 0 ? (
                    <div>
                      {bodyFields.map(renderField)}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        <code className="font-mono">request</code>, <code className="font-mono">nonce</code>, <code className="font-mono">nonceWindow</code> added automatically.
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5">
                      No body parameters required.{" "}
                      <code className="font-mono">request</code>, <code className="font-mono">nonce</code>, <code className="font-mono">nonceWindow</code> added automatically.
                    </p>
                  )
                ) : (
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5 mb-1.5">
                      <code className="font-mono">request</code>, <code className="font-mono">nonce</code>, <code className="font-mono">nonceWindow</code> added automatically.
                    </p>
                    <textarea
                      className={INPUT_CLS + " min-h-[80px] resize-y"}
                      rows={4}
                      value={params}
                      onChange={function (e) { setParams(e.target.value); }}
                      placeholder='{ "market": "BTC_USDT" }'
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap items-center gap-1.5 px-0.5">
            <button
              type="button"
              onClick={send}
              disabled={busy}
              className="flex items-center justify-center px-3 h-9 text-sm font-medium rounded-xl hover:opacity-80 gap-1.5 transition-opacity disabled:opacity-50 disabled:pointer-events-none bg-[#3064E3] text-white"
            >
              {busy ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : "Send request"}
            </button>
            <button
              type="button"
              onClick={compute}
              disabled={busy}
              className="flex items-center justify-center px-3 h-9 text-sm font-medium rounded-xl border-standard hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:pointer-events-none text-gray-700 dark:text-gray-300 bg-background-light dark:bg-background-dark"
            >
              Compute headers
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="px-3.5 py-2.5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-sm text-red-600 dark:text-red-400 break-words">
              {error}
            </div>
          )}

          {/* Computed headers */}
          {computed && (
            <div className={SECTION_CLS + " overflow-hidden"}>
              <div className="flex items-center justify-between pt-3 pb-2.5 px-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Computed headers</span>
              </div>
              <div className="px-3.5 pb-3.5">
                {headerRows.map(function (row) {
                  return (
                    <div key={row.key} className="mt-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{row.key}</span>
                        <button
                          type="button"
                          onClick={function () { copy(row.value); }}
                          className="text-xs px-2 py-0.5 rounded-lg border-standard hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
                        >
                          copy
                        </button>
                      </div>
                      <input
                        readOnly
                        value={row.value}
                        className="w-full rounded-xl border-standard px-3 py-2 text-xs font-mono bg-gray-50 dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 outline-none select-all cursor-default"
                      />
                    </div>
                  );
                })}
                <details className="mt-2.5">
                  <summary className="text-xs text-gray-400 dark:text-gray-500 cursor-pointer select-none hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    full request body
                  </summary>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all mt-2 text-gray-600 dark:text-gray-400 m-0">
                    {(function () {
                      try { return JSON.stringify(JSON.parse(computed.bodyStr), null, 2); }
                      catch (e) { return computed.bodyStr; }
                    })()}
                  </pre>
                </details>
                {computed.queryString && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1">
                    query: {computed.queryString}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className={SECTION_CLS + " overflow-hidden"}>
              <div className="flex items-center gap-2 pt-3 pb-2.5 px-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Response</span>
                <span className={
                  "text-xs font-mono font-medium px-1.5 py-0.5 rounded-lg " +
                  (response.status < 400
                    ? "bg-[#2AB673]/10 text-[#2AB673]"
                    : "bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300")
                }>
                  {response.status}
                </span>
              </div>
              <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-80 m-0 px-3.5 py-3 text-gray-700 dark:text-gray-300">
                {response.body}
              </pre>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
