"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SessionStatus = "checking" | "signed-in" | "signed-out";
type PlaygroundResponse = {
  status: number;
  statusText: string;
  updated: boolean;
  message: string;
};

type CsrfPlaygroundProps = Readonly<{
  trustedOrigin: string;
}>;

function differentPortOrigin(origin: string) {
  try {
    const url = new URL(origin);
    let currentPort = Number(url.port);
    if (!currentPort) {
      currentPort = url.protocol === "https:" ? 443 : 80;
    }
    url.port = String(currentPort + 1);
    return url.origin;
  } catch {
    return "";
  }
}

function getResponseMessage(
  response: PlaygroundResponse,
  acceptedWithoutSession: boolean,
  acceptedUnexpectedOrigin: boolean,
) {
  if (acceptedWithoutSession) {
    return "Bug reproduced: an unauthenticated update was accepted";
  }
  if (acceptedUnexpectedOrigin) {
    return "Bug reproduced: a different origin was accepted";
  }
  if (response.updated) return "Trusted-origin update accepted";
  if (response.status === 401) return "Session required";
  return "Request rejected";
}

function getResponseClassName(
  response: PlaygroundResponse,
  acceptedWithoutSession: boolean,
  acceptedUnexpectedOrigin: boolean,
) {
  return response.updated && !acceptedWithoutSession && !acceptedUnexpectedOrigin
    ? "correct"
    : "incorrect";
}

export default function CsrfPlayground({ trustedOrigin }: CsrfPlaygroundProps) {
  const [simulatedOrigin, setSimulatedOrigin] = useState(trustedOrigin);
  const [displayName, setDisplayName] = useState("Ada Learner");
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("checking");
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function refreshSession() {
    const result = await fetch("/api/debug/lesson-09", { cache: "no-store" });
    if (!result.ok) throw new Error(`Session lookup failed: HTTP ${result.status}.`);
    const body = (await result.json()) as { authenticated: boolean };
    setSessionStatus(body.authenticated ? "signed-in" : "signed-out");
  }

  useEffect(() => {
    let mounted = true;
    fetch("/api/debug/lesson-09", { cache: "no-store" })
      .then((result) => {
        if (!result.ok) throw new Error("Session lookup failed.");
        return result.json() as Promise<{ authenticated: boolean }>;
      })
      .then((body) => {
        if (mounted) setSessionStatus(body.authenticated ? "signed-in" : "signed-out");
      })
      .catch(() => {
        if (mounted) setSessionStatus("signed-out");
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function submitUpdate(event: { preventDefault: () => void }) {
    event.preventDefault();
    setBusy(true);
    setResponse(null);
    setError("");

    try {
      const formData = new FormData();
      formData.set("displayName", displayName);
      const result = await fetch("/api/debug/lesson-12-csrf", {
        method: "POST",
        headers: { "X-CSRF-Lab-Origin": simulatedOrigin },
        body: formData,
        cache: "no-store",
      });
      const body = (await result.json()) as {
        updated?: boolean;
        error?: string;
      };
      setResponse({
        status: result.status,
        statusText: result.statusText,
        updated: body.updated === true,
        message: body.updated
          ? "The simulated profile update was accepted."
          : body.error ?? "The request was rejected.",
      });
      await refreshSession();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The request failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  function selectOrigin(kind: "trusted" | "port" | "other") {
    if (kind === "trusted") setSimulatedOrigin(trustedOrigin);
    if (kind === "port") setSimulatedOrigin(differentPortOrigin(trustedOrigin));
    if (kind === "other") setSimulatedOrigin("https://attacker.example");
  }

  const acceptedUnexpectedOrigin = Boolean(
    response?.updated && simulatedOrigin !== trustedOrigin,
  );
  const acceptedWithoutSession = Boolean(
    response?.updated && sessionStatus === "signed-out",
  );

  return (
    <section className="card route-handler-playground csrf-playground">
      <div className="route-playground-label">SIMULATED PROFILE MUTATION</div>
      <h2>Exercise the request guards</h2>
      <p>
        Session: <strong>{sessionStatus}</strong>. The browser sends its real
        HttpOnly cookie automatically. Use the auth page to sign in or out
        between cases.
      </p>
      <div className="auth-session-actions">
        <Link className="button small secondary" href="/authentication-sessions">
          Manage demo session
        </Link>
        <button
          className="button small secondary"
          type="button"
          onClick={() => void refreshSession()}
        >
          Refresh session
        </button>
      </div>
      <div className="redirect-presets" aria-label="Origin test cases">
        <button className="button small secondary" type="button" onClick={() => selectOrigin("trusted")}>
          This origin
        </button>
        <button className="button small secondary" type="button" onClick={() => selectOrigin("port")}>
          Same host, different port
        </button>
        <button className="button small secondary" type="button" onClick={() => selectOrigin("other")}>
          Different host
        </button>
      </div>
      <form onSubmit={submitUpdate}>
        <label className="field">
          <span>Origin to simulate</span>
          <input
            aria-label="Origin to simulate"
            type="url"
            value={simulatedOrigin}
            onChange={(event) => setSimulatedOrigin(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Display name</span>
          <input
            aria-label="Display name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            maxLength={80}
            required
          />
        </label>
        <label className="field">
          <button className="button" type="submit" disabled={busy || !trustedOrigin}>
          {busy ? "Checking request…" : "Submit profile update"}
          </button>
        </label>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>POST</strong></span>
        <span>ENDPOINT <code>/api/debug/lesson-12-csrf</code></span>
        <span>CHANGE <strong>Simulated only</strong></span>
      </div>
      <p className="csrf-playground-note">
        The playground uses a lab-only header to simulate Origin values; normal
        browser code cannot set the real <code>Origin</code> header.
      </p>
      {error && <p className="route-response-error" role="alert">{error}</p>}
      {response && (
        <section className="route-response" aria-live="polite" aria-label="CSRF response">
          <div className="route-response-status">
            RESPONSE <strong>{response.status} {response.statusText}</strong>
          </div>
          <p>{response.message}</p>
          <strong
            className={getResponseClassName(
              response,
              acceptedWithoutSession,
              acceptedUnexpectedOrigin,
            )}
          >
            {getResponseMessage(
              response,
              acceptedWithoutSession,
              acceptedUnexpectedOrigin,
            )}
          </strong>
        </section>
      )}
    </section>
  );
}