"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type ProxyAction = "continue" | "rewrite" | "redirect";

type ProxyResponse = {
  status: number;
  statusText: string;
  finalUrl: string;
  body: string;
  handler?: string;
  action?: string;
};

const actions: { value: ProxyAction; label: string; description: string }[] = [
  {
    value: "continue",
    label: "Continue",
    description: "Forward the request to the matched Route Handler.",
  },
  {
    value: "rewrite",
    label: "Rewrite",
    description: "Serve an internal target without changing the visible URL.",
  },
  {
    value: "redirect",
    label: "Redirect",
    description: "Send the browser fetch to an internal target URL.",
  },
];

function isProxyAction(value: string): value is ProxyAction {
  return actions.some((item) => item.value === value);
}

export default function ProxyPlayground() {
  const [action, setAction] = useState<ProxyAction>("continue");
  const [response, setResponse] = useState<ProxyResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch(
        `/api/debug/lesson-13?action=${action}`,
        { cache: "no-store" },
      );
      const body = await result.text();
      let handler: string | undefined;
      let responseAction: string | undefined;

      try {
        const parsed: unknown = JSON.parse(body);
        if (typeof parsed === "object" && parsed !== null) {
          if ("handledBy" in parsed && typeof parsed.handledBy === "string") {
            handler = parsed.handledBy;
          }
          if ("proxyAction" in parsed && typeof parsed.proxyAction === "string") {
            responseAction = parsed.proxyAction;
          }
        }
      } catch {
        throw new Error("The response was not valid JSON.");
      }

      setResponse({
        status: result.status,
        statusText: result.statusText,
        finalUrl: result.url,
        body,
        handler,
        action: responseAction,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The request failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  const selectedAction = actions.find((item) => item.value === action);

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE PROXY REQUEST</div>
      <h2>Choose how Proxy handles the request</h2>
      <p>
        The Proxy matcher covers <code>/api/debug/lesson-13</code>. It checks
        for the Module 9 cookie, then applies the selected request action.
      </p>
      <p className="auth-session-login-link">
        Need a session?{" "}
        <Link href="/authentication-sessions">Sign in through Module 9 ↗</Link>
      </p>
      <form onSubmit={sendRequest}>
        <label className="field">
          <span>Proxy action</span>
          <select
            aria-label="Proxy action"
            value={action}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (isProxyAction(value)) {
                setAction(value);
              }
            }}
          >
            {actions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <p className="proxy-action-description">{selectedAction?.description}</p>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Sending request…" : "Send request"}
        </button>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>
          MATCHED PATH <code>/api/debug/lesson-13</code>
        </span>
        <span>
          ACTION <strong>{action}</strong>
        </span>
      </div>
      {error && (
        <p className="route-response-error" role="alert">
          {error}
        </p>
      )}
      {response && (
        <section
          className="route-response"
          aria-live="polite"
          aria-label="Proxy response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 200 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <div className="proxy-response-details">
            <div><span>Final URL</span><code>{response.finalUrl}</code></div>
            <div><span>Handler</span><code>{response.handler ?? "Proxy (handler not reached)"}</code></div>
            <div><span>Action observed</span><code>{response.action ?? "blocked before handler"}</code></div>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {response.status === 401
              ? "Proxy blocked this request before the Route Handler ran. Sign in through Module 9 and try again."
              : action === "continue"
                ? "Proxy continued to the original handler and forwarded a request header describing the action."
                : action === "rewrite"
                  ? "Proxy rewrote the request internally. The response comes from the target handler while the browser keeps the original URL."
                  : "Proxy redirected the fetch to an internal target. The response URL shows the new destination; the page itself did not navigate."}
          </p>
        </section>
      )}
      <p className="proxy-security-note">
        The Proxy currently checks only whether a cookie exists, not whether
        it represents a valid session. Try a fabricated cookie with curl, then
        add real session verification in the Route Handler. Never trust a
        client-supplied “Proxy passed” header as authentication.
      </p>
    </section>
  );
}
