import TaskManager from "@/components/TaskManager";
export default function TasksPage() { return <main><div className="eyebrow">Hands-on playground</div><h1>Task management API</h1><p className="lead">A tiny working feature to explore route handlers, parameters, validation, status codes, and tests.</p><div className="callout"><strong>Trace the request:</strong> Create uses <code>POST /api/tasks</code>, list uses <code>GET /api/tasks</code>, and each task action uses <code>/api/tasks/[id]</code>.</div><div style={{marginTop:24}}><TaskManager /></div><h2>Try the API directly</h2><pre><code>{`curl http://localhost:3000/api/tasks

curl http://localhost:3000/api/tasks/1

curl -X POST http://localhost:3000/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"My first API task"}'`}</code></pre><p className="muted">The API uses in-memory data, so it resets when the server restarts.</p></main>; }
