# Reference solution — Lesson 15

## Intended reasoning

The tests are not connected to the behaviors they claim to cover. A pure-function test asserts a hard-coded value, a service test ignores the service result, and a hook test expects the unnormalized input. Repair the tests at their public boundaries.

## Suggested approach

1. Run the focused test and inspect which cases pass or fail for the wrong reason.
2. Arrange IDs, service state, and hook input separately.
3. Act by calling `canEditTask`, `listTasks`, and `useTaskLabel` through `renderHook`.
4. Assert the returned boolean, owner-filtered task list, and trimmed label.
5. Reset task-service state in `beforeEach()`.
6. Mutate each subject temporarily and confirm its test fails.

## Corrected tests

```tsx
import { renderHook } from "@testing-library/react";
import { canEditTask } from "@/lib/task-rules";
import {
	createTask,
	listTasks,
	resetTasksForTests,
} from "@/lib/services/task-service";

beforeEach(() => {
	resetTasksForTests();
});

it("allows the owner to edit a task", () => {
	// Arrange
	const userId = "user-1";
	const ownerId = "user-1";

	// Act
	const result = canEditTask(userId, ownerId);

	// Assert
	expect(result).toBe(true);
});

it("returns tasks for the requested owner", () => {
	// Arrange
	createTask("Private task", "user-2");

	// Act
	const tasks = listTasks("user-1");

	// Assert
	expect(tasks).toHaveLength(3);
	expect(tasks.every((task) => task.ownerId === "user-1")).toBe(true);
});

it("trims a task label", () => {
	const { result } = renderHook(() => useTaskLabel("  Secure task  "));

	expect(result.current).toBe("Secure task");
});
```

## Review checklist
- Does each test call the subject under test?
- Does each service test isolate mutable state?
- Does each hook test use a hook-aware renderer?
- Are assertions based on observable behavior rather than implementation details?
- Would each test fail if its subject regressed?

**Instructor note:** This is an editor-based exercise. Accept equivalent tests when they exercise the pure function, service, and hook through their public behavior and include evidence that regressions fail.
