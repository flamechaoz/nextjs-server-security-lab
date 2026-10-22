# Debugging Lab 15: Pure functions, services, and hooks

**Estimated time:** 15–25 minutes  
**Mode:** Editor-based unit testing; edit the tests, then run them.

## Scenario
A small test suite passes without proving the intended behavior. One test hard-codes a pure-function result, one ignores the task-service result, and one expects a hook to preserve whitespace even though the hook normalizes it.

## Your mission

1. Open `debugging/lesson-15/broken-tests.test.ts` and identify the subject under test in each case.
2. Replace the hard-coded pure-function result with `canEditTask(userId, ownerId)`.
3. Capture `listTasks("user-1")` and assert that it contains only that owner's tasks; keep `resetTasksForTests()` in `beforeEach()`.
4. Keep the hook inside `renderHook` and assert the trimmed return value.
5. Run `pnpm exec jest debugging/lesson-15/broken-tests.test.ts --testPathIgnorePatterns="^$"`.
6. Temporarily break each subject and confirm its corresponding test fails.

## Hints (open one at a time)

<details><summary>Hint 1: Find the missing Act phase</summary>
The first test sets up IDs but assigns `true` directly. The Act phase must call `canEditTask`.
</details>

<details><summary>Hint 2: Isolate service state</summary>
The task service is stateful. Reset it before each test, call `listTasks`, and assert the returned tasks instead of asserting `true`.
</details>

<details><summary>Hint 3: Run the hook correctly</summary>
Use `renderHook(() => useTaskLabel(...))`; the expected current result is the trimmed title.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Original focused test output
- [ ] Corrected pure-function, service, and hook assertions
- [ ] Verification command and passing output
- [ ] Mutation result showing the tests fail when behavior is wrong

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-15/SOLUTION.md`.
