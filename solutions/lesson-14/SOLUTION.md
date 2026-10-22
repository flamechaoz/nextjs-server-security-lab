# Reference solution — Lesson 14

## Intended reasoning

A test passes for the wrong reason because it asserts a hard-coded value. The test must call `canEditTask` and assert its returned value so a regression is detected.

## Suggested approach

1. Run the broken test and observe that it passes.
2. Arrange the owner and user IDs.
3. Act by calling `canEditTask(userId, ownerId)`.
4. Assert that the returned value is `true`.
5. Run `pnpm exec jest debugging/lesson-14/broken-test.test.ts --testPathIgnorePatterns="^$"`.
6. Temporarily make `canEditTask` return `false` and confirm the focused test fails.

## Corrected test

```tsx
import { canEditTask } from "@/lib/task-rules";

describe("canEditTask", () => {
	it("allows the owner", () => {
		// Arrange
		const userId = "user-1";
		const ownerId = "user-1";

		// Act
		const result = canEditTask(userId, ownerId);

		// Assert
		expect(result).toBe(true);
	});
});
```

## Review checklist
- Does the test call the function under test?
- Are Arrange, Act, and Assert easy to identify?
- Would the test fail if `canEditTask` returned the wrong result?
- Does the assertion check the function result rather than a hard-coded value?

**Instructor note:** This is an editor-based exercise. Learners do not need an interactive page; accept equivalent tests when they execute `canEditTask` and demonstrate that a regression fails.
