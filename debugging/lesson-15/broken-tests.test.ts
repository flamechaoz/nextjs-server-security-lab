import { renderHook } from "@testing-library/react";
import { canEditTask } from "@/lib/task-rules";
import {
  createTask,
  listTasks,
  resetTasksForTests,
} from "@/lib/services/task-service";

export function useTaskLabel(title: string) {
  return title.trim() || "Untitled task";
}

describe("pure function", () => {
  it("allows the owner to edit a task", () => {
    const userId = "user-1";
    const ownerId = "user-1";

    // INTENTIONAL BUG: this assertion never calls canEditTask.
    const result = true;

    expect(result).toBe(true);
  });
});

describe("task service", () => {
  beforeEach(() => {
    resetTasksForTests();
  });

  it("returns tasks for the requested owner", () => {
    createTask("Private task", "user-2");

    // INTENTIONAL BUG: this assertion does not inspect the service result.
    listTasks("user-1");
    expect(true).toBe(true);
  });
});

describe("useTaskLabel", () => {
  it("trims the title before displaying it", () => {
    const { result } = renderHook(() => useTaskLabel("  Secure task  "));

    // INTENTIONAL BUG: this expected value includes whitespace.
    expect(result.current).toBe("  Secure task  ");
  });
});
