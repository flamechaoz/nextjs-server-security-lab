import Link from "next/link";
import CsrfPlayground from "@/components/CsrfPlayground";

export const metadata = {
  title: "CSRF Logic Playground · Next Lab",
  description:
    "Debug asynchronous session-cookie checks and incomplete Origin validation.",
};

export default function CsrfPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/common-web-vulnerabilities"
        className="boundary-demo-back"
      >
        ← Back to Recognize common web vulnerabilities
      </Link>
      <div className="section-kicker">CHAPTER 12 · CSRF LOGIC PLAYGROUND</div>
      <h1>Debug the profile update guard</h1>
      <p className="boundary-demo-lead">
        Test the session and Origin checks on a simulated profile update. The
        endpoint never persists profile data; use the cases below to isolate
        both security bugs.
      </p>
      <CsrfPlayground
        trustedOrigin={process.env.APP_ORIGIN ?? "http://localhost:3000"}
      />
      <section className="boundary-demo-steps">
        <h2>Two checks are faulty</h2>
        <ol>
          <li>The session cookie lookup returns a Promise, but the handler checks the Promise itself instead of awaiting the cookie store.</li>
          <li>The Origin check compares hostnames only, so it treats a different port as the same origin.</li>
          <li>Sign out and submit from this origin to reproduce the missing-session check.</li>
          <li>Sign in, select the same host on another port, and submit to reproduce the incomplete Origin check.</li>
          <li>Await <code>cookies()</code>, validate the session, and compare the complete Origin to the configured trusted origin.</li>
        </ol>
      </section>
      <Link
        href="/learn/common-web-vulnerabilities?mode=debug#debug"
        className="button"
      >
        Return to lesson 12 →
      </Link>
    </main>
  );
}