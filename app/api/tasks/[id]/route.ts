import { NextResponse } from "next/server";
import { deleteTask, findTask, updateTask } from "@/lib/services/task-service";
import { updateTaskSchema } from "@/lib/validation/task-schema";
type Context = { params: Promise<{ id: string }> };
function parseId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
export async function GET(_request: Request, context: Context) {
  const { id: rawId } = await context.params;
  const id = parseId(rawId);
  if (id === null)
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  const task = findTask(id);
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return NextResponse.json({ data: task });
}
export async function PATCH(request: Request, context: Context) {
  const { id: rawId } = await context.params;
  const id = parseId(rawId);
  if (id === null)
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }
  const parsed = updateTaskSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid task update", details: parsed.error.flatten() },
      { status: 400 },
    );
  const task = updateTask(id, parsed.data);
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return NextResponse.json({ data: task });
}
export async function DELETE(_request: Request, context: Context) {
  const { id: rawId } = await context.params;
  const id = parseId(rawId);
  if (id === null)
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  if (!deleteTask(id))
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
