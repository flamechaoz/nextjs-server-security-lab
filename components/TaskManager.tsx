"use client";
import { FormEvent, useEffect, useState } from "react";
type Task = { id: number; title: string; completed: boolean; ownerId: string };
export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("Loading tasks…");
  async function loadTasks() {
    const response = await fetch("/api/tasks", { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Could not load tasks");
    setTasks(result.data);
    setMessage(`${result.count} task(s) loaded`);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks().catch((error) => setMessage(error.message));
  }, []);
  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error ?? "Could not create task");
      return;
    }
    setTitle("");
    await loadTasks();
  }
  async function toggleTask(task: Task) {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const result = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      setMessage(result?.error ?? "Could not update task");
      return;
    }
    await loadTasks();
  }
  async function removeTask(id: number) {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json();
      setMessage(result.error ?? "Could not delete task");
      return;
    }
    await loadTasks();
  }
  return (
    <section className="card">
      <h2>Task API playground</h2>
      <p>
        Try the UI, then inspect the matching Route Handler under{" "}
        <code>app/api/tasks</code>.
      </p>
      <form onSubmit={addTask}>
        <label className="field">
          <span>New task title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Debug a route handler"
            maxLength={120}
          />
        </label>
        <button className="button" type="submit">
          Create task
        </button>
      </form>
      <p aria-live="polite" className="muted">
        {message}
      </p>
      <div>
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <div className="muted">
                <small>
                  ID {task.id} · {task.completed ? "Completed" : "Open"}
                </small>
              </div>
            </div>
            <div
              className="actions"
              style={{ marginTop: 0, display: "flex", gap: 8 }}
            >
              <button
                data-testid="toggle-task"
                className="button primary"
                onClick={() => toggleTask(task)}
              >
                {task.completed ? "Reopen" : "Complete"}
              </button>
              <button
                className="button secondary"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
