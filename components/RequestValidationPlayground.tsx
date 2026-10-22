"use client";

import { useState, type FormEvent } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  body: string;
};

export default function RequestValidationPlayground() {
  const [title, setTitle] = useState("   ");
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch("/api/debug/lesson-06", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
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
      setSending(false);
    }
  }

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE INPUT VALIDATION REQUEST</div>
      <h2>Submit a whitespace-only title</h2>
      <p>
        The title is prefilled with three spaces. The practice route should
        reject it after you fix the schema to trim before checking its length.
      </p>
      <form onSubmit={sendRequest}>
        <label className="field">
          <span>Task title</span>
          <input
            aria-label="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
          />
          <button className="button" type="submit" disabled={sending}>
            {sending ? "Sending POST…" : "Submit title"}
          </button>
        </label>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>POST</strong></span>
        <span>URL <code>/api/debug/lesson-06</code></span>
        <span>BODY <code>{JSON.stringify({ title })}</code></span>
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
          aria-label="Validation response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 400 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {response.status === 400
              ? "Correct: the route rejected the whitespace-only title with HTTP 400."
              : response.status === 201
                ? "Bug reproduced: whitespace-only input was accepted. Trim the title before applying min(1)."
                : "Inspect the response and confirm invalid input is rejected with HTTP 400."}
          </p>
        </section>
      )}
    </section>
  );
}
