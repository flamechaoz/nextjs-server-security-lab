import { NextResponse } from "next/server";

// INTENTIONAL BUG: wrong lesson number and message.
export function GET() {
  return NextResponse.json({ message: "Hello from the broken endpoint", lesson: 99 });
}
