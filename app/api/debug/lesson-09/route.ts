import { NextResponse } from "next/server";
// INTENTIONAL BUG: trusts a userId query parameter as authenticated identity.
export function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId");
  return NextResponse.json({ authenticatedAs: userId, privateData: "demo-only" });
}
