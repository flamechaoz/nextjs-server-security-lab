import { NextResponse } from "next/server";

// INTENTIONAL BUG: returns a value that should stay server-side.
export function GET() {
  return NextResponse.json({ app: "Next Lab", token: "demo-secret-not-configured" });
}
