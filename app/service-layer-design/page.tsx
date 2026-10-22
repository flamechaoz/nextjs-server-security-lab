import Link from "next/link";
import ServiceLayerPlayground from "@/components/ServiceLayerPlayground";

export const metadata = {
  title: "Service Layer Playground · Next Lab",
  description:
    "Compare a practice task route with a service-backed API and inspect their response contracts.",
};

export default function ServiceLayerPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/service-layer-design"
        className="boundary-demo-back"
      >
        ← Back to Separate routes from business logic
      </Link>
      <div className="section-kicker">CHAPTER 08 · LIVE DEBUGGING PLAYGROUND</div>
      <h1>Compare service-backed task responses</h1>
      <p className="boundary-demo-lead">
        The practice Route Handler should delegate data retrieval to the shared
        task service and follow the same response contract as the task API.
      </p>
      <ServiceLayerPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the service boundary</h2>
        <ol>
          <li>Compare the practice route with the service-backed task API.</li>
          <li>Open <code>app/api/debug/lesson-08/route.ts</code>.</li>
          <li>Use <code>listTasks()</code> from <code>lib/services/task-service.ts</code>.</li>
          <li>Return the service result as <code>{`{ data, count }`}</code> and compare again.</li>
        </ol>
      </section>
      <Link
        href="/learn/service-layer-design?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
