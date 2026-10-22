import Link from "next/link";
import ServerDataFetchingPlayground from "@/components/ServerDataFetchingPlayground";

export const metadata = {
  title: "Server Data Fetching Playground · Next Lab",
  description:
    "Inspect the data returned by a server route and verify private fields stay out of the browser response.",
};

export default function ServerDataFetchingPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/server-data-fetching"
        className="boundary-demo-back"
      >
        ← Back to Fetch data on the server
      </Link>
      <div className="section-kicker">CHAPTER 04 · LIVE DEBUGGING PLAYGROUND</div>
      <h1>Inspect a server response</h1>
      <p className="boundary-demo-lead">
        Request the chapter&apos;s practice Route Handler, inspect the JSON sent
        to the browser, then remove any private fields from the server response
        and try again.
      </p>
      <ServerDataFetchingPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the data boundary</h2>
        <ol>
          <li>Fetch the server data and inspect the JSON response.</li>
          <li>Open <code>app/api/debug/lesson-04/route.ts</code>.</li>
          <li>Remove the token-like field while keeping the safe app name.</li>
          <li>Fetch again and confirm the response no longer includes the token.</li>
        </ol>
      </section>
      <Link
        href="/learn/server-data-fetching?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
