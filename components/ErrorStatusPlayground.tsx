"use client";

import { useState, type FormEvent } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  body: string;
};

export default function ErrorStatusPlayground() {
  const [taskId, setTaskId] = useState("999");
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch(
        `/api/debug/lesson-07?id=${encodeURIComponent(taskId)}`,
        { cache: "no-store" },
      );
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

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE GET REQUEST</div>
      <h2>Request a task by ID</h2>
      <p>
        Task ID 1 exists. Try the prefilled unknown ID to reproduce the
        incorrect status, then try ID 1 to compare a successful lookup.
      </p>
      <form onSubmit={sendRequest}>
        <label className="field">
          <span>Task ID</span>
          <input
            aria-label="Task ID"
            inputMode="numeric"
            value={taskId}
            onChange={(event) => setTaskId(event.target.value)}
            required
          />
        </label>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Requesting task…" : "Send GET request"}
        </button>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>
          URL <code>/api/debug/lesson-07?id={taskId || "…"}</code>
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
          aria-label="Task lookup response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong className={response.status === 404 || response.status === 200 ? "correct" : "incorrect"}>
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {response.status === 500
              ? "Bug reproduced: the task is missing, but the route reports an internal server error. Return 404 for this expected condition."
              : response.status === 404
                ? "Correct: the unknown task is reported with HTTP 404."
                : response.status === 200
                  ? "The task exists and the lookup succeeded with HTTP 200."
                  : "Inspect the response status and body for this request."}
          </p>
        </section>
      )}
    </section>
  );
}
