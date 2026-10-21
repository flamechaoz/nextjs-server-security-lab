import { NextResponse } from "next/server";
type Context = { params: Promise<{ id: string }> };

// INTENTIONAL BUG: the route parameter is ignored and task 1 is always returned.
export async function GET(_request: Request, _context: Context) {
  return NextResponse.json({ requestedTaskId: 1, title: "Always the first task" });
}
