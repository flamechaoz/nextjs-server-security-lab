import { NextResponse } from "next/server";
// INTENTIONAL BUG: accepts an arbitrary redirect destination.
export function GET(request: Request) {
  const destination = new URL(request.url).searchParams.get("returnTo") ?? "/";
  return NextResponse.json({ redirectTo: destination });
}
