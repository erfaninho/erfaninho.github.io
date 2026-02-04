import { FormEvent, useEffect, useMemo, useState } from "react";
import { config } from "../config";
import { copyText } from "../lib/copy";
import Reveal from "./Reveal";

const API_KEY = "AIzaSyDPKmTBJQsY4uZInhLGhvyFKpWi7MP0GvA";

type ParsedItem = {
  index: number;
  description?: string;
  code?: string;
};

type ParsedResponse = {
  items: ParsedItem[];
  rawText?: string;
  parsedJson?: unknown;
};

function buildEndpoint(template: string, model: string) {
  return template.replaceAll("{model}", encodeURIComponent(model));
}

function extractFirstCodeFence(text: string) {
  const match = text.match(/```[a-zA-Z0-9_-]*\s*\n([\s\S]*?)\n```/);
  return match?.[1]?.trim() ?? null;
}

function safeJsonParse(text: string) {
  try {
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch (err) {
    return { ok: false as const, error: err };
  }
}

function parseResponseShape(data: any): ParsedResponse {
  const rawText =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n") ??
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.text ??
    "";

  if (typeof rawText !== "string" || rawText.trim().length === 0) {
    return { items: [], rawText: typeof rawText === "string" ? rawText : undefined, parsedJson: data };
  }

  const maybeJson = extractFirstCodeFence(rawText) ?? rawText.trim();
  const parsed = safeJsonParse(maybeJson);
  if (!parsed.ok || typeof parsed.value !== "object" || parsed.value === null) {
    return { items: [], rawText, parsedJson: data };
  }

  const obj = parsed.value as Record<string, unknown>;
  const byIndex = new Map<number, ParsedItem>();

  for (const [key, value] of Object.entries(obj)) {
    const m = key.match(/^(description|code)(\d+)$/i);
    if (!m) continue;
    if (!m[1] || !m[2]) continue;
    const field = m[1].toLowerCase() as "description" | "code";
    const index = Number(m[2]);
    if (!Number.isFinite(index)) continue;

    const existing = byIndex.get(index) ?? { index };
    if (typeof value === "string") existing[field] = value;
    byIndex.set(index, existing);
  }

  const items = Array.from(byIndex.values()).sort((a, b) => a.index - b.index);
  return { items, rawText, parsedJson: obj };
}

export default function ApiCaller() {
  const models = config.apiCaller.models;
  const [model, setModel] = useState(models[0] ?? "");
  const [endpoint, setEndpoint] = useState(() =>
    model && config.apiCaller.endpointTemplate ? buildEndpoint(config.apiCaller.endpointTemplate, model) : "",
  );
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ParsedResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computedEndpoint = useMemo(() => {
    if (!model || !config.apiCaller.endpointTemplate) return "";
    return buildEndpoint(config.apiCaller.endpointTemplate, model);
  }, [model]);

  useEffect(() => {
    setEndpoint(computedEndpoint);
  }, [computedEndpoint]);

  async function onCopy(label: string, text: string) {
    await copyText(text);
    setCopiedKey(label);
    window.setTimeout(() => setCopiedKey(null), 900);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!endpoint) {
      setError("Missing endpoint. Set VITE_API_ENDPOINT_TEMPLATE or enter an endpoint manually.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a request body / prompt.");
      return;
    }

    const payload = {
      contents: [{ parts: [{ text: prompt.trim() }] }],
    };

    setIsSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-goog-api-key": API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        setError(`Request failed (${res.status}). ${text.slice(0, 400)}`);
        return;
      }

      const parsed = safeJsonParse(text);
      if (!parsed.ok) {
        setError("Response was not valid JSON.");
        return;
      }

      setResult(parseResponseShape(parsed.value));
    } catch (err: any) {
      setError(err?.message ?? "Request failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack">
      <div className="stack tight">
        <h1 className="h2">API Caller</h1>
        <p className="muted">Pick a model, send a request, and render the response as readable description/code blocks.</p>
      </div>

      <Reveal as="form" className="card form" onSubmit={onSubmit}>
        <label className="field">
          <span className="label">Model</span>
          <select className="select" value={model} onChange={(e) => setModel(e.target.value)}>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="label">Endpoint (changes with model)</span>
          <input
            className="input"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://example.com/api/{model}"
          />
          {config.apiCaller.endpointTemplate ? (
            <span className="muted apiHint">From template: {config.apiCaller.endpointTemplate}</span>
          ) : (
            <span className="muted apiHint">Tip: set VITE_API_ENDPOINT_TEMPLATE (supports {`{model}`}).</span>
          )}
        </label>

        <label className="field">
          <span className="label">Request body (text)</span>
          <textarea
            className="textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want the model to return..."
            rows={8}
          />
          <span className="muted apiHint">
            This page sends JSON: <code>{`{ contents: [{ parts: [{ text }] }] }`}</code>
          </span>
        </label>

        <div className="row">
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Calling…" : "Call API"}
          </button>
          <button
            className="button buttonGhost"
            type="button"
            onClick={() => onCopy("endpoint", endpoint)}
            disabled={!endpoint}
          >
            {copiedKey === "endpoint" ? "Copied!" : "Copy endpoint"}
          </button>
          <span className="muted grow">{error ? error : " "}</span>
        </div>
      </Reveal>

      {result ? (
        <div className="stack">
          {result.items.length ? (
            result.items.map((item) => (
              <Reveal key={item.index} className="card apiResultCard">
                <div className="row apiResultTop">
                  <h3 className="h3">Result {item.index}</h3>
                  {item.code ? (
                    <button
                      className="button buttonGhost"
                      type="button"
                      onClick={() => onCopy(`code-${item.index}`, item.code ?? "")}
                    >
                      {copiedKey === `code-${item.index}` ? "Copied!" : "Copy code"}
                    </button>
                  ) : null}
                </div>

                {item.description ? <p className="muted">{item.description}</p> : null}
                {item.code ? (
                  <pre className="codeBlock">
                    <code>{item.code}</code>
                  </pre>
                ) : null}
              </Reveal>
            ))
          ) : (
            <Reveal className="card apiResultCard">
              <h3 className="h3">Response</h3>
              <p className="muted">Couldn’t extract description/code fields. Showing raw text.</p>
              <pre className="codeBlock">
                <code>{result.rawText ?? ""}</code>
              </pre>
            </Reveal>
          )}

          <details className="apiRaw">
            <summary className="link">Show parsed JSON</summary>
            <pre className="codeBlock">
              <code>{JSON.stringify(result.parsedJson ?? null, null, 2)}</code>
            </pre>
          </details>
        </div>
      ) : null}
    </div>
  );
}
