import { NextResponse } from "next/server";
// INTENTIONAL BUG: no ownership check is performed.
export function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "1";
  return NextResponse.json({ taskId: id, ownerId: "user-1", visibleToAnyUser: true });
}
