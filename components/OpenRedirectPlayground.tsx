"use client";

import { useState, type FormEvent } from "react";

type ResponseDetails = {
  status: number;
  statusText: string;
  redirectTo: string;
};

const presets = [
  { label: "Local path", value: "/dashboard" },
  { label: "External URL", value: "https://example.test" },
  { label: "Protocol-relative", value: "//example.test" },
];

function isExternalDestination(destination: string) {
  if (destination.startsWith("//")) return true;

  try {
    return new URL(destination, window.location.origin).origin !== window.location.origin;
  } catch {
    return true;
  }
}

export default function OpenRedirectPlayground() {
  const [returnTo, setReturnTo] = useState("/dashboard");
  const [response, setResponse] = useState<ResponseDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const query = new URLSearchParams({ returnTo });
      const result = await fetch(`/api/debug/lesson-12?${query.toString()}`, {
        cache: "no-store",
      });
      const body: unknown = await result.json();
      if (
        typeof body !== "object" ||
        body === null ||
        !("redirectTo" in body) ||
        typeof body.redirectTo !== "string"
      ) {
        throw new Error("The practice API returned an unexpected response.");
      }
      setResponse({
        status: result.status,
        statusText: result.statusText,
        redirectTo: body.redirectTo,
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

  const external = response ? isExternalDestination(response.redirectTo) : false;
  const destinationWasBlocked =
    response !== null &&
    response.redirectTo !== returnTo &&
    !isExternalDestination(response.redirectTo);

  return (
    <section className="card route-handler-playground">
      <div className="route-playground-label">SAFE REDIRECT INSPECTION</div>
      <h2>Choose a return destination</h2>
      <p>
        The API currently echoes the destination without validating it. This
        page will show the proposed result, but will never follow the URL.
      </p>
      <div className="redirect-presets" aria-label="Example destinations">
        {presets.map((preset) => (
          <button
            className="button small secondary"
            key={preset.value}
            type="button"
            onClick={() => setReturnTo(preset.value)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <form onSubmit={submitDestination}>
        <label className="field">
          <span>returnTo</span>
          <input
            aria-label="returnTo destination"
            value={returnTo}
            onChange={(event) => setReturnTo(event.target.value)}
            maxLength={500}
            required
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Checking destination…" : "Inspect destination"}
          </button>
        </label>
      </form>
      <div className="route-request-details">
        <span>METHOD <strong>GET</strong></span>
        <span>URL <code>/api/debug/lesson-12?returnTo=…</code></span>
        <span>REDIRECT <strong>Not followed by this playground</strong></span>
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
          aria-label="Redirect destination response"
        >
          <div className="route-response-status">
            RESPONSE
            <strong>{response.status} {response.statusText}</strong>
          </div>
          <div className="redirect-destination-result">
            <span>Proposed destination</span>
            <code>{response.redirectTo}</code>
            <strong className={external ? "incorrect" : "correct"}>
              {external
                ? "External destination — unsafe"
                : destinationWasBlocked
                  ? "Untrusted destination blocked"
                  : "Local destination"}
            </strong>
          </div>
          <p>
            {external
              ? "Bug reproduced: the server accepted an external destination. Reject it or replace it with a safe local fallback."
              : destinationWasBlocked
                ? "The external destination was replaced with a local fallback."
                : "This destination stays on the current origin."}
          </p>
        </section>
      )}
    </section>
  );
}
