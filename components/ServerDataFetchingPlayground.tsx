"use client";

import { useState } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  body: string;
};

export default function ServerDataFetchingPlayground() {
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function inspectResponse() {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch("/api/debug/lesson-04", { cache: "no-store" });
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

  const exposesToken = response?.body.includes('"token"') ?? false;

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE SERVER DATA REQUEST</div>
      <h2>Inspect the data sent to the browser</h2>
      <p>
        Request the practice API route and inspect its JSON. Server-side code
        stays on the server, but every field in this response reaches the
        caller.
      </p>
      <button
        className="button"
        type="button"
        onClick={inspectResponse}
        disabled={loading}
      >
        {loading ? "Fetching data…" : "Fetch server data"}
      </button>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>URL <code>/api/debug/lesson-04</code></span>
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
          aria-label="Server data response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 200 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {exposesToken
              ? "The response exposes a token-like field. Remove it from the server route; anything returned here is visible to the browser."
              : "No token field is present in this response. Only return the display-safe fields the caller needs."}
          </p>
        </section>
      )}
    </section>
  );
}
