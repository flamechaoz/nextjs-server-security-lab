"use client";

import { useState } from "react";

type ApiResponse = {
  status: number;
  body: string;
};

type Comparison = {
  practice: ApiResponse;
  tasks: ApiResponse;
};

function getTaskData(body: string): { data: unknown[]; count: number } | null {
  try {
    const value: unknown = JSON.parse(body);
    if (
      typeof value === "object" &&
      value !== null &&
      "data" in value &&
      Array.isArray(value.data) &&
      "count" in value &&
      typeof value.count === "number"
    ) {
      return { data: value.data, count: value.count };
    }
  } catch {
    return null;
  }

  return null;
}

export default function ServiceLayerPlayground() {
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function compareResponses() {
    setLoading(true);
    setError("");
    setComparison(null);

    try {
      const [practiceResult, tasksResult] = await Promise.all([
        fetch("/api/debug/lesson-08", { cache: "no-store" }),
        fetch("/api/tasks", { cache: "no-store" }),
      ]);
      const [practiceBody, tasksBody] = await Promise.all([
        practiceResult.text(),
        tasksResult.text(),
      ]);
      setComparison({
        practice: { status: practiceResult.status, body: practiceBody },
        tasks: { status: tasksResult.status, body: tasksBody },
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The requests failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  const practiceData = comparison
    ? getTaskData(comparison.practice.body)
    : null;
  const tasksData = comparison ? getTaskData(comparison.tasks.body) : null;
  const matches =
    comparison?.practice.status === 200 &&
    comparison.tasks.status === 200 &&
    practiceData !== null &&
    tasksData !== null &&
    JSON.stringify(practiceData) === JSON.stringify(tasksData);
  const responses = comparison
    ? [
        { label: "Practice route", response: comparison.practice },
        { label: "Service-backed API", response: comparison.tasks },
      ]
    : [];

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">LIVE SERVICE COMPARISON</div>
      <h2>Compare the task-list endpoints</h2>
      <p>
        Fetch both routes and inspect their response contracts. The task API
        uses the shared service; the practice route should return the same task
        data and count.
      </p>
      <button
        className="button"
        type="button"
        onClick={compareResponses}
        disabled={loading}
      >
        {loading ? "Comparing responses…" : "Compare API responses"}
      </button>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>
          PRACTICE <code>/api/debug/lesson-08</code>
        </span>
        <span>
          SERVICE API <code>/api/tasks</code>
        </span>
      </div>
      {error && (
        <p className="route-response-error" role="alert">
          {error}
        </p>
      )}
      {comparison && (
        <>
          <div className="service-response-grid">
            {responses.map(({ label, response }) => {
              return (
                <section className="route-response" key={label}>
                  <div className="route-response-status">
                    {label}
                    <strong className={response.status === 200 ? "correct" : "incorrect"}>
                      {response.status}
                    </strong>
                  </div>
                  <pre><code>{response.body}</code></pre>
                </section>
              );
            })}
          </div>
          <p className="service-comparison-result" aria-live="polite">
            {matches
              ? "The response data and count match. The practice route now returns the shared service contract."
              : "The responses do not match. Update the practice route to call listTasks() and return the { data, count } contract."}
          </p>
        </>
      )}
    </section>
  );
}
