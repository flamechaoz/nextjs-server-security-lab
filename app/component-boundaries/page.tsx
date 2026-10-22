import "server-only";
import Link from "next/link";
import BoundaryCounter from "@/components/BoundaryCounter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Server and Client Component Demo · Next Lab",
  description: "An interactive example of the App Router Server and Client Component boundary.",
};

export default function ComponentBoundariesDemo() {
  const renderedAt = new Date().toLocaleString("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="boundary-demo-page">
      <Link href="/learn/server-and-client-components" className="boundary-demo-back">
        ← Back to Choose the right component boundary
      </Link>
      <div className="section-kicker">LIVE COMPONENT BOUNDARY DEMO</div>
      <h1>Server-rendered page, client-side interaction</h1>
      <p className="boundary-demo-lead">
        This page is a Server Component by default. It renders the server
        details and passes a serializable value and server-rendered content to
        the small Client Component below.
      </p>

      <section className="boundary-demo-server">
        <div className="boundary-demo-label">SERVER COMPONENT · NO CLIENT DIRECTIVE</div>
        <h2>Rendered by the server</h2>
        <p>
          This page was rendered at <strong>{renderedAt}</strong>. The server
          page owns this content; the counter below owns its interactive state.
        </p>
        <code>app/component-boundaries/page.tsx</code>
      </section>

      <BoundaryCounter initialCount={0}>
        This explanatory text is rendered by the Server Component and passed
        into the Client Component as a slot.
      </BoundaryCounter>

      <section className="boundary-demo-steps">
        <h2>Trace the boundary</h2>
        <ol>
          <li>Open <code>app/component-boundaries/page.tsx</code>: it has no <code>&quot;use client&quot;</code> directive.</li>
          <li>Open <code>components/BoundaryCounter.tsx</code>: its first statement is <code>&quot;use client&quot;</code>.</li>
          <li>Click the counter. Its count changes in the browser without turning the page into a Client Component.</li>
          <li>Notice that the server-rendered content is passed to the client component as <code>children</code>.</li>
        </ol>
      </section>

      <Link
        href="/learn/server-and-client-components?mode=debug#debug"
        className="button"
      >
        Go to the debugging activity →
      </Link>
    </main>
  );
}
