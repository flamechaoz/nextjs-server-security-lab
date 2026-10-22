"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type TaskResponse = {
  task: {
    id: number;
    title: string;
    ownerId: string;
  };
};

type ApiResponse = {
  status: number;
  statusText: string;
  body: string;
  task?: TaskResponse["task"];
};

export default function AuthorizationOwnershipPlayground() {
  const [taskId, setTaskId] = useState("2");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await fetch(
        `/api/debug/lesson-10?id=${encodeURIComponent(taskId)}`,
        { cache: "no-store" },
      );
      const body = await result.text();
      let task: TaskResponse["task"] | undefined;

      if (result.ok) {
        const parsed: unknown = JSON.parse(body);
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "task" in parsed &&
          typeof parsed.task === "object" &&
          parsed.task !== null &&
          "id" in parsed.task &&
          typeof parsed.task.id === "number" &&
          "title" in parsed.task &&
          typeof parsed.task.title === "string" &&
          "ownerId" in parsed.task &&
          typeof parsed.task.ownerId === "string"
        ) {
          task = {
            id: parsed.task.id,
            title: parsed.task.title,
            ownerId: parsed.task.ownerId,
          };
        } else {
          throw new Error("The API returned an unexpected task response.");
        }
      }

      setResponse({
        status: result.status,
        statusText: result.statusText,
        body,
        task,
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
      <div className="route-playground-label">SESSION-PROTECTED RESOURCE API</div>
      <h2>Request a task using your Module 9 session</h2>
      <p>
        First sign in through Module 9. Then request task 1, owned by the demo
        user, and task 2, owned by someone else. The practice route requires a
        session but intentionally has a broken ownership check.
      </p>
      <p className="auth-session-login-link">
        Need a session?{" "}
        <Link href="/authentication-sessions">Open the Module 9 login playground ↗</Link>
      </p>
      <form onSubmit={requestTask}>
        <label className="field">
          <span>Task ID</span>
          <input
            aria-label="Task ID"
            inputMode="numeric"
            value={taskId}
            onChange={(event) => setTaskId(event.target.value)}
            required
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Checking access…" : "Request task"}
          </button>
        </label>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>
          URL <code>/api/debug/lesson-10?id={taskId || "…"}</code>
        </span>
        <span>AUTH <code>Module 9 HttpOnly session cookie</code></span>
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
          aria-label="Protected task response"
        >
          <div className="route-response-status">
            RESPONSE STATUS
            <strong
              className={
                response.status === 200 && response.task?.ownerId === "demo-user-001"
                  ? "correct"
                  : "incorrect"
              }
            >
              {response.status} {response.statusText}
            </strong>
          </div>
          <pre><code>{response.body}</code></pre>
          <p>
            {response.status === 401
              ? "No valid Module 9 session was found. Sign in first; authentication is required before authorization can be evaluated."
              : response.status === 200 &&
                  response.task?.ownerId === "demo-user-001"
                ? "Authorized: this task belongs to the signed-in demo user."
                : response.status === 200
                  ? "Authorization bug reproduced: you are signed in, but this task belongs to a different user and was still returned."
                  : response.status === 403 || response.status === 404
                    ? "Access denied: the API did not return another user's task."
                    : "Inspect the response and determine whether access was properly checked."}
          </p>
        </section>
      )}
    </section>
  );
}
