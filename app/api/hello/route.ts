import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ message: "Hello from the Next.js server!", lesson: 1 });
}
