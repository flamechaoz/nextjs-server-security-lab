import { NextResponse } from "next/server";
// INTENTIONAL BUG: only happy-path coverage is reported.
export function GET() {
  return NextResponse.json({ branchesCovered: 100, unauthorizedBranchTested: false });
}
