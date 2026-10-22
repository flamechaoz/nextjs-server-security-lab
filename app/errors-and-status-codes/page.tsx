import Link from "next/link";
import ErrorStatusPlayground from "@/components/ErrorStatusPlayground";

export const metadata = {
  title: "Error Status Codes Playground · Next Lab",
  description:
    "Compare successful task lookups with missing-task responses and inspect their HTTP status codes.",
};

export default function ErrorStatusPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/errors-and-status-codes"
        className="boundary-demo-back"
      >
        ← Back to Return predictable errors
      </Link>
      <div className="section-kicker">CHAPTER 07 · LIVE DEBUGGING PLAYGROUND</div>
      <h1>Test the status for a missing task</h1>
      <p className="boundary-demo-lead">
        Request an existing or unknown task ID from the chapter&apos;s practice
        Route Handler and inspect the HTTP status and JSON response.
      </p>
      <ErrorStatusPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the not-found response</h2>
        <ol>
          <li>Request the prefilled unknown ID and note the status.</li>
          <li>Open <code>app/api/debug/lesson-07/route.ts</code>.</li>
          <li>Change the missing-task response from HTTP 500 to HTTP 404.</li>
          <li>Submit again, then request ID <code>1</code> to verify success remains HTTP 200.</li>
        </ol>
      </section>
      <Link
        href="/learn/errors-and-status-codes?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
