import { NextResponse } from "next/server";
// INTENTIONAL BUG: reports denial after simulating a side effect.
let mutationCount = 0;
export function POST() {
  mutationCount += 1;
  return NextResponse.json({ error: "Forbidden", mutationCount }, { status: 403 });
}
