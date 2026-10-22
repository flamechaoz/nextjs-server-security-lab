import Link from "next/link";
import SecretsBoundaryPlayground from "@/components/SecretsBoundaryPlayground";

export const metadata = {
  title: "Secrets and Server Boundaries Playground · Next Lab",
  description:
    "Inspect a server route response and learn why returned data is visible to the browser.",
};

export default function SecretsBoundaryPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/secrets-and-server-boundaries"
        className="boundary-demo-back"
      >
        ← Back to Keep secrets out of the browser
      </Link>
      <div className="section-kicker">CHAPTER 11 · LIVE SECRETS PLAYGROUND</div>
      <h1>Keep private values out of responses</h1>
      <p className="boundary-demo-lead">
        Compare server-side execution with browser visibility: the route runs
        on the server, but its response body is delivered to this page. Inspect
        it, remove the private field, and request it again.
      </p>
      <SecretsBoundaryPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the data boundary</h2>
        <ol>
          <li>Fetch the practice route and inspect its JSON response.</li>
          <li>Open <code>app/api/debug/lesson-11/route.ts</code>.</li>
          <li>Remove the token-like field while keeping safe display data.</li>
          <li>Fetch again and confirm that the response contains no token field.</li>
          <li>Explain how this differs from a secret embedded in a client bundle.</li>
        </ol>
      </section>
      <Link
        href="/learn/secrets-and-server-boundaries?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
