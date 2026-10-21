import { NextResponse } from "next/server";
// INTENTIONAL BUG: this endpoint assumes an upstream Proxy check is sufficient.
export function GET() {
  return NextResponse.json({ protected: true, data: "available without route-level checks" });
}
