import Link from "next/link";
import RequestValidationPlayground from "@/components/RequestValidationPlayground";

export const metadata = {
  title: "Request Validation Playground · Next Lab",
  description:
    "Send whitespace-only input to a practice Route Handler and inspect its Zod validation response.",
};

export default function RequestValidationPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/request-validation-with-zod"
        className="boundary-demo-back"
      >
        ← Back to Validate untrusted input
      </Link>
      <div className="section-kicker">CHAPTER 06 · LIVE DEBUGGING PLAYGROUND</div>
      <h1>Test Zod validation against whitespace</h1>
      <p className="boundary-demo-lead">
        Send a whitespace-only title to the chapter&apos;s practice Route
        Handler. Observe the current response, fix the schema, and submit the
        same input again.
      </p>
      <RequestValidationPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the validation</h2>
        <ol>
          <li>Submit the prefilled title and note its response status.</li>
          <li>Open <code>app/api/debug/lesson-06/route.ts</code>.</li>
          <li>Trim the title before requiring at least one character.</li>
          <li>Submit again and verify whitespace-only input returns <code>400</code>.</li>
        </ol>
      </section>
      <Link
        href="/learn/request-validation-with-zod?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
