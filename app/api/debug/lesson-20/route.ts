import { NextResponse } from "next/server";
// INTENTIONAL BUG: cross-user access is not rejected.
export function GET(request: Request) {
  const user = new URL(request.url).searchParams.get("user") ?? "user-2";
  return NextResponse.json({ requestedBy: user, taskOwner: "user-1", data: "private demo task" });
}
