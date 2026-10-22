import Link from "next/link";
import OpenRedirectPlayground from "@/components/OpenRedirectPlayground";

export const metadata = {
  title: "Open Redirect Playground · Next Lab",
  description:
    "Safely inspect how a returnTo destination is handled without navigating to an untrusted URL.",
};

export default function CommonWebVulnerabilitiesPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/common-web-vulnerabilities"
        className="boundary-demo-back"
      >
        ← Back to Recognize common web vulnerabilities
      </Link>
      <div className="section-kicker">CHAPTER 12 · OPEN REDIRECT PLAYGROUND</div>
      <h1>Test untrusted redirect destinations</h1>
      <p className="boundary-demo-lead">
        Submit local, external, and protocol-relative destinations to the
        practice API. The playground displays the proposed destination but
        never navigates to it.
      </p>
      <OpenRedirectPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace and fix the redirect decision</h2>
        <ol>
          <li>Try <code>/dashboard</code>, <code>https://example.test</code>, and <code>{"//example.test"}</code>.</li>
          <li>Open <code>app/api/debug/lesson-12/route.ts</code> and find where <code>returnTo</code> is used.</li>
          <li>Keep a safe local path and fall back to <code>/</code> for external destinations.</li>
          <li>Resubmit all three examples and verify only the local path is preserved.</li>
        </ol>
      </section>
      <Link
        href="/learn/common-web-vulnerabilities?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
