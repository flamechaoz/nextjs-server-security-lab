import { NextResponse } from "next/server";

// INTENTIONAL BUG: this component demo reports a stale value.
export function GET() {
  return NextResponse.json({ component: "Counter", interactive: false, reason: "client boundary missing" });
}
