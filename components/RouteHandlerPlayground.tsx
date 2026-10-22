"use client";

import { useState, type FormEvent } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  body: string;
};

export default function RouteHandlerPlayground() {
  const [title, setTitle] = useState("Trace a POST request");
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch("/api/debug/lesson-03", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const body = await result.text();
      setResponse({
        status: result.status,
        statusText: result.statusText,
        body,
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The request failed.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE POST REQUEST</div>
      <h2>Send a task-creation request</h2>
      <p>
        This Client Component sends JSON to the intentionally broken practice
        handler. Submit the request before and after fixing its status code.
      </p>
      <form onSubmit={sendRequest}>
        <label className="field">
          <span>Request body · JSON title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={120}
          />
        <button className="button" type="submit" disabled={sending}>
          {sending ? "Sending POST…" : "Send POST request"}
        </button>
        </label>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>POST</strong></span>
        <span>URL <code>/api/debug/lesson-03</code></span>
        <span>BODY <code>{JSON.stringify({ title })}</code></span>
      </div>
      {error && <p className="route-response-error" role="alert">{error}</p>}
      {response && (
        <section className="route-response" aria-live="polite" aria-label="POST response">
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 201 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {response.status === 201
              ? "Correct: the resource was created and the handler returned 201 Created."
              : "This handler should return 201 Created for a successful resource creation. Find the status in the POST handler and fix it."}
          </p>
        </section>
      )}
    </section>
  );
}
