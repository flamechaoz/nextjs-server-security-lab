// Exercise snippet: compare with app/api/hello/route.ts
import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ message: "Hello from the browser!", lesson: 0 }, { status: 500 });
}
