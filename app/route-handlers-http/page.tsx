import Link from "next/link";
import RouteHandlerPlayground from "@/components/RouteHandlerPlayground";

export const metadata = {
  title: "Route Handler POST Playground · Next Lab",
  description: "Send a POST request to the lesson's practice Route Handler and inspect its HTTP response.",
};

export default function RouteHandlerHttpPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link href="/learn/route-handlers-and-http" className="boundary-demo-back">
        ← Back to Build a Route Handler
      </Link>
      <div className="section-kicker">CHAPTER 03 · LIVE DEBUGGING PLAYGROUND</div>
      <h1>Send a POST request and inspect the response</h1>
      <p className="boundary-demo-lead">
        The page is server-rendered. The request form is interactive and sends a
        real POST to the chapter&apos;s practice Route Handler.
      </p>
      <RouteHandlerPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the request</h2>
        <ol>
          <li>Submit the form and inspect the response status shown above.</li>
          <li>Open <code>app/api/debug/lesson-03/route.ts</code> and find the POST handler.</li>
          <li>Change the successful creation response to return <code>201 Created</code>.</li>
          <li>Submit again; confirm the live response now shows <code>201 Created</code>.</li>
        </ol>
      </section>
      <Link
        href="/learn/route-handlers-and-http?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
