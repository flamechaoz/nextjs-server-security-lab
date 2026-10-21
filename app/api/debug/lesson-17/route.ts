import { NextResponse } from "next/server";
// INTENTIONAL BUG: malformed JSON is not caught.
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ accepted: body }, { status: 201 });
}
