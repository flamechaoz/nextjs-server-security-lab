import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ title: z.string().min(1) });
// INTENTIONAL BUG: raw whitespace passes this schema.
export async function POST(request: Request) {
  const body: unknown = await request.json();
  const parsed = schema.safeParse(body);
  return parsed.success ? NextResponse.json({ accepted: parsed.data }, { status: 201 }) : NextResponse.json({ error: "Invalid input" }, { status: 400 });
}
