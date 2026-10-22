import Link from "next/link";
import ProxyPlayground from "@/components/ProxyPlayground";

export const metadata = {
  title: "Proxy Request Flow Playground · Next Lab",
  description:
    "Explore how Next.js Proxy blocks, forwards, redirects, and rewrites requests.",
};

export default function ProxyPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/proxy-and-request-protection"
        className="boundary-demo-back"
      >
        ← Back to Use Proxy without over-trusting it
      </Link>
      <div className="section-kicker">CHAPTER 13 · REQUEST INTERCEPTION PLAYGROUND</div>
      <h1>Watch Proxy handle a request</h1>
      <p className="boundary-demo-lead">
        Proxy runs before the matched API route. Sign in through Module 9, then
        compare forwarding, rewriting, and redirecting while inspecting which
        handler responds.
      </p>
      <ProxyPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the request lifecycle</h2>
        <ol>
          <li>Send a request while signed out and see Proxy block it before the route handler runs.</li>
          <li>Sign in through Module 9, then send a continue request and inspect the Proxy-added request header.</li>
          <li>Try rewrite and redirect; compare the final URL and responding handler.</li>
          <li>Inspect <code>proxy.ts</code> and <code>app/api/debug/lesson-13/route.ts</code>.</li>
          <li>Add a session check in the Route Handler. Proxy is an early gate, not a replacement for endpoint security.</li>
        </ol>
      </section>
      <Link
        href="/learn/proxy-and-request-protection?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
