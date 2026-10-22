"use client";

import { useState, type FormEvent } from "react";

type DemoUser = {
  userId: string;
  username: string;
  role: string;
};

type SessionStatus = {
  authenticated: boolean;
  user: DemoUser | null;
  cookie: {
    name: string;
    present: boolean;
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
    path: string;
    expiresAt: string | null;
  };
};

export default function AuthenticationSessionPlayground() {
  const [username, setUsername] = useState("");
  const [session, setSession] = useState<SessionStatus | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function refreshSession() {
    const response = await fetch("/api/debug/lesson-09", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Session lookup failed with HTTP ${response.status}.`);
    }
    setSession((await response.json()) as SessionStatus);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/debug/lesson-09", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const body = (await response.json()) as
        | { error: string }
        | { authenticated: true; user: DemoUser };
      if (!response.ok) {
        setError("error" in body ? body.error : "Login failed.");
        return;
      }
      if (!("user" in body)) {
        throw new Error("The login response did not include a user.");
      }

      await refreshSession();
      setMessage(`Signed in as ${body.user.username}.`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The login request failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleRefresh() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await refreshSession();
      setMessage("Session status refreshed from the server.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The session request failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/debug/lesson-09", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Sign-out failed with HTTP ${response.status}.`);
      }
      await refreshSession();
      setMessage("Signed out. The server-side session was revoked.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The sign-out request failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-session-playground">
      <section className="card route-handler-playground">
        <div className="route-playground-label">DEMO AUTHENTICATION API</div>
        <h2>Sign in to create a session</h2>
        <p>
          This demo accepts any non-empty username. The server assigns a fixed
          demo user ID and learner role; it does not authenticate real
          credentials or contact an identity provider.
        </p>
        <form onSubmit={handleLogin}>
          <label className="field">
            <span>Username</span>
            <input
              aria-label="Username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={60}
              required
            />
            <button className="button" type="submit" disabled={busy}>
              {busy ? "Working…" : "Sign in"}
            </button>
          </label>
        </form>
        <div className="route-request-details">
          <span>LOGIN <code>POST /api/debug/lesson-09</code></span>
          <span>SESSION <code>GET /api/debug/lesson-09</code></span>
          <span>LOGOUT <code>DELETE /api/debug/lesson-09</code></span>
        </div>
        {message && <p className="auth-session-message" role="status">{message}</p>}
        {error && <p className="route-response-error" role="alert">{error}</p>}
      </section>

      <section className="card auth-session-details" aria-live="polite">
        <div className="route-playground-label">SESSION &amp; COOKIE DETAILS</div>
        <h2>Session status</h2>
        {session ? (
          <>
            <p>
              Status:{" "}
              <strong>{session.authenticated ? "Authenticated" : "Signed out"}</strong>
            </p>
            {session.user && (
              <dl className="auth-session-user">
                <div><dt>User ID</dt><dd>{session.user.userId}</dd></div>
                <div><dt>Username</dt><dd>{session.user.username}</dd></div>
                <div><dt>Role</dt><dd>{session.user.role}</dd></div>
              </dl>
            )}
            <h3>Session cookie policy</h3>
            <dl className="auth-cookie-details">
              <div><dt>Name</dt><dd><code>{session.cookie.name}</code></dd></div>
              <div><dt>Present</dt><dd>{session.cookie.present ? "Yes" : "No"}</dd></div>
              <div><dt>HttpOnly</dt><dd>{session.cookie.httpOnly ? "Yes" : "No"}</dd></div>
              <div><dt>Secure</dt><dd>{session.cookie.secure ? "Yes" : "No (local development)"}</dd></div>
              <div><dt>SameSite</dt><dd>{session.cookie.sameSite}</dd></div>
              <div><dt>Path</dt><dd>{session.cookie.path}</dd></div>
              <div>
                <dt>Expires</dt>
                <dd>
                  {session.cookie.expiresAt
                    ? new Date(session.cookie.expiresAt).toLocaleString()
                    : "No active session"}
                </dd>
              </div>
            </dl>
            <p className="auth-cookie-note">
              The cookie value is intentionally not returned to the page.
              Because it is HttpOnly, JavaScript cannot read it. To inspect the
              browser-stored cookie, use your browser&apos;s developer tools.
            </p>
            <div className="auth-session-actions">
              <button
                className="button small"
                type="button"
                onClick={handleRefresh}
                disabled={busy}
              >
                Refresh session
              </button>
              <button
                className="button small secondary"
                type="button"
                onClick={handleLogout}
                disabled={busy || !session.authenticated}
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="auth-session-actions">
            <p>Check the server for an existing session to get started.</p>
            <button
              className="button small"
              type="button"
              onClick={handleRefresh}
              disabled={busy}
            >
              Check session
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
