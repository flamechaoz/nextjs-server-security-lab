# Reference solution — Lesson 05: Dynamic route params

The dynamic segment `[id]` is passed through `context.params`. In this Next.js version, `params` is a Promise, so await it before reading the ID. Then validate and convert the external string before using it to find a task.

```ts
import { NextResponse } from "next/server";
import { findTask } from "@/lib/services/task-service";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id: rawId } = await context.params;
  if (!/^\\d+$/.test(rawId)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }
  const task = findTask(id);
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  return NextResponse.json({ data: { id: task.id, title: task.title, completed: task.completed } });
}
```

Verify `/api/tasks/1` returns the processed task object, `/api/tasks/nope` returns 400, and `/api/tasks/9999` returns 404. Never trust a route parameter simply because it came from a URL.
