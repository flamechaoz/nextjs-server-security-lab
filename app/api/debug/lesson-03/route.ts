import { NextResponse } from "next/server";

// INTENTIONAL BUG: creation uses the default 200 status.
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ created: body }, { status: 200 });
}
