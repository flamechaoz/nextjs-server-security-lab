import { NextResponse } from "next/server";
// INTENTIONAL BUG: no boundary validation.
export function POST(request: Request) {
  return request.text().then((value) => NextResponse.json({ accepted: value, valid: true }));
}
