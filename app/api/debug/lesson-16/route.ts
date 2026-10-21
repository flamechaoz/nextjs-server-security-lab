import { NextResponse } from "next/server";
// INTENTIONAL BUG: tests should verify accessible UI, not CSS selectors.
export function GET() {
  return NextResponse.json({ selector: ".green-button", testStrategy: "implementation detail" });
}
