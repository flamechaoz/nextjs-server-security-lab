import Link from "next/link";
import AuthorizationOwnershipPlayground from "@/components/AuthorizationOwnershipPlayground";

export const metadata = {
  title: "Authorization and Ownership Playground · Next Lab",
  description:
    "Use the Module 9 session to test task ownership and prevent unauthorized resource access.",
};

export default function AuthorizationOwnershipPlaygroundPage() {
  return (
    <main className="boundary-demo-page">
      <Link
        href="/learn/authorization-and-ownership"
        className="boundary-demo-back"
      >
        ← Back to Authorize every resource access
      </Link>
      <div className="section-kicker">CHAPTER 10 · SESSION-BASED ACCESS CONTROL</div>
      <h1>Authentication first, ownership second</h1>
      <p className="boundary-demo-lead">
        Module 9 establishes who you are. This module uses that same session to
        decide whether you may access each task.
      </p>
      <AuthorizationOwnershipPlayground />
      <section className="boundary-demo-steps">
        <h2>Trace the access decision</h2>
        <ol>
          <li>Sign in at the Module 9 playground if you do not have a session.</li>
          <li>Request task 1, owned by <code>demo-user-001</code>.</li>
          <li>Request task 2, owned by <code>demo-user-002</code>.</li>
          <li>Open <code>app/api/debug/lesson-10/route.ts</code> and add an owner check before returning a task.</li>
          <li>Verify no session returns <code>401</code>, task 1 succeeds, and task 2 is denied.</li>
        </ol>
      </section>
      <Link
        href="/learn/authorization-and-ownership?mode=debug#debug"
        className="button"
      >
        Open the debugging activity →
      </Link>
    </main>
  );
}
