import { NextResponse } from "next/server";
// INTENTIONAL BUG: not-found is incorrectly reported as a server error.
export function GET() {
  return NextResponse.json({ error: "Task not found" }, { status: 500 });
}
