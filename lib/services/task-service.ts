export type Task = {
  id: number;
  title: string;
  completed: boolean;
  ownerId: string;
};

let tasks: Task[] = [
  {
    id: 1,
    title: "Trace GET /api/hello",
    completed: false,
    ownerId: "demo-user",
  },
  {
    id: 2,
    title: "Read the Route Handler",
    completed: false,
    ownerId: "demo-user",
  },
  {
    id: 3,
    title: "Write a regression test",
    completed: true,
    ownerId: "demo-user",
  },
];

let nextId = 4;

export function listTasks(ownerId = "demo-user"): Task[] {
  return tasks.filter((task) => task.ownerId === ownerId);
}

export function findTask(id: number): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function createTask(title: string, ownerId = "demo-user"): Task {
  const task = { id: nextId++, title, completed: false, ownerId };
  tasks = [...tasks, task];
  return task;
}

export function updateTask(
  id: number,
  patch: Partial<Pick<Task, "title" | "completed">>,
): Task | undefined {
  const index = tasks.findIndex((task) => task.id === id);
  if (index < 0) return undefined;
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...patch } : task));
  return tasks.find((task) => task.id === id);
}

export function deleteTask(id: number): boolean {
  const before = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length !== before;
}

// Test-only helper. Do not expose this through a production API.
export function resetTasksForTests() {
  tasks = [
    {
      id: 1,
      title: "Trace GET /api/hello",
      completed: false,
      ownerId: "demo-user",
    },
    {
      id: 2,
      title: "Read the Route Handler",
      completed: false,
      ownerId: "demo-user",
    },
    {
      id: 3,
      title: "Write a regression test",
      completed: true,
      ownerId: "demo-user",
    },
  ];
  nextId = 4;
}
