import { NextResponse } from "next/server";
import { getDemoSessionFromRequest } from "@/lib/demo-session";

export const dynamic = "force-dynamic";

const tasks = [
  {
    id: 1,
    title: "Module 9 learner task",
    ownerId: "demo-user-001",
  },
  {
    id: 2,
    title: "Another user's private task",
    ownerId: "demo-user-002",
  },
];

export function GET(request: Request) {
  const session = getDemoSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const rawId = new URL(request.url).searchParams.get("id") ?? "1";
  if (!/^\d+$/.test(rawId)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }

  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  // INTENTIONAL BUG: authentication is checked, but resource ownership is not.
  return NextResponse.json({ task });
}
