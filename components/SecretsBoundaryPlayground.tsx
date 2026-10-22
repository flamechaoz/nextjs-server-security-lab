"use client";

import { useState } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  body: string;
};

export default function SecretsBoundaryPlayground() {
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function inspectResponse() {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch("/api/debug/lesson-11", {
        cache: "no-store",
      });
      setResponse({
        status: result.status,
        statusText: result.statusText,
        body: await result.text(),
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

  const hasToken = response?.body.includes('"token"') ?? false;

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE SERVER RESPONSE INSPECTION</div>
      <h2>Inspect what the browser receives</h2>
      <p>
        Fetch the practice Route Handler and inspect its JSON. Although the
        handler executes on the server, every field in its response is visible
        to this browser.
      </p>
      <button
        className="button"
        type="button"
        onClick={inspectResponse}
        disabled={loading}
      >
        {loading ? "Fetching response…" : "Fetch server response"}
      </button>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>URL <code>/api/debug/lesson-11</code></span>
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
          aria-label="Secrets exercise API response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 200 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {hasToken
              ? "Exposure reproduced: the token-like field is in the HTTP response and is visible to the browser. Remove it from the route's response."
              : "No token field appears in the HTTP response. Keep private values on the server and return only what the UI needs."}
          </p>
        </section>
      )}
      <p className="secrets-bundle-note">
        This demonstrates an API-response leak, not a browser-bundle leak.
        Inspecting JavaScript bundles is a separate check for accidental
        NEXT_PUBLIC_ or client-import exposure.
      </p>
    </section>
  );
}
