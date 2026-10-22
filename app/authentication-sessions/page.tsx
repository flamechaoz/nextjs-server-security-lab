import Link from "next/link";
import AuthenticationSessionPlayground from "@/components/AuthenticationSessionPlayground";

export const metadata = {
  title: "Authentication and Sessions Playground · Next Lab",
  description:
    "Create a demo login session, inspect safe cookie attributes, and revoke the session.",
};

export default function AuthenticationSessionPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/authentication-sessions"
        className="boundary-demo-back"
      >
        ← Back to Authenticate the requester
      </Link>
      <div className="section-kicker">CHAPTER 09 · INTERACTIVE SESSION LAB</div>
      <h1>Sign in and inspect your session</h1>
      <p className="boundary-demo-lead">
        Submit a demo username to create a server-side session. Inspect its safe
        details and cookie attributes, then sign out to revoke the session.
      </p>
      <AuthenticationSessionPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the session lifecycle</h2>
        <ol>
          <li>Submit a username to the demo login API.</li>
          <li>Inspect the assigned user ID, role, and cookie security attributes.</li>
          <li>Confirm the cookie value is not exposed to browser JavaScript.</li>
          <li>Sign out and check that the server no longer recognizes the session.</li>
        </ol>
      </section>
      <Link
        href="/learn/authentication-sessions?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
