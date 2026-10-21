import { NextResponse } from "next/server";
// INTENTIONAL BUG: result is hard-coded; no behavior is exercised.
export function GET() {
  return NextResponse.json({ passed: true, testedFunction: false });
}
