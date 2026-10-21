import { NextResponse } from "next/server";
// INTENTIONAL BUG: private config is returned to the client.
export function GET() {
  return NextResponse.json({ configuration: { token: "demo-secret-not-configured" } });
}
