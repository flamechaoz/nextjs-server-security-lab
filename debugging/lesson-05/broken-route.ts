// Exercise snippet: the dynamic segment is /api/tasks/[id].
// Bug: params is asynchronous in this Next.js version, and the ID is never processed.
import { NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const id = context.params.id;
  return NextResponse.json({ message: `You requested task ${id}` });
}
