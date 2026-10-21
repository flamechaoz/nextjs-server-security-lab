import { NextResponse } from "next/server";
import { createTask } from "@/lib/services/task-service";
import { listTasks } from "@/lib/services/task-service";
import { createTaskSchema } from "@/lib/validation/task-schema";
export function GET() {
  return NextResponse.json({ data: listTasks(), count: listTasks().length });
}
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 }); }
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid task", details: parsed.error.flatten() }, { status: 400 });
  const task = createTask(parsed.data.title);
  return NextResponse.json({ data: task }, { status: 201 });
}
