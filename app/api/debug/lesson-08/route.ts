import { NextResponse } from "next/server";
// INTENTIONAL BUG: this handler returns different shapes for the same operation.
export function GET() {
  return NextResponse.json({ tasks: [] });
}
