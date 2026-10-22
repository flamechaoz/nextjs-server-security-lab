import { NextResponse } from "next/server";

// INTENTIONAL BUG: not-found is incorrectly reported as a server error.
export function GET(request: Request) {
  const rawId = new URL(request.url).searchParams.get("id");

  if (!rawId || !/^\d+$/.test(rawId)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }

  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }

  if (id === 1) {
    return NextResponse.json({ data: { id: 1, title: "Sample task" } });
  }

  return NextResponse.json({ error: "Task not found" }, { status: 500 });
}
