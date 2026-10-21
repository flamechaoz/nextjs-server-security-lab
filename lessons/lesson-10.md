# Lesson 10: Authorization and ownership

## Learning objectives
By the end of this lesson, you should be able to explain the core concept, find the relevant code in the project, and verify behavior with a repeatable check.

## Part A — Learn and implement

### Goal
Protect each resource, not just the page.

### Start here
Inspect: `lib/task-rules.ts; app/api/tasks/[id]/route.ts`.

### Guided activity
Use canEditTask and inspect ownerId in task data. Design checks for read, update, and delete operations.

### Verify your work
- Reproduce the expected behavior before editing.
- Make one small change at a time.
- Verify the result using the browser, `curl`, or an automated test.
- Explain why the behavior occurs, rather than only memorizing the file path.

### Check your understanding
1. Which file owns the behavior?
2. What input enters the code and what output leaves it?
3. What should happen for invalid or unexpected input?
4. What automated check would prevent a regression?

## Part B — Debugging challenge

### Bug report
Changing /api/tasks/1 to /api/tasks/2 lets a user act on someone else's task. Add an ownership check in the protected service or handler and test the denial.

### Rules
1. Reproduce the bug and record the actual output.
2. Find the file that handles the request or owns the behavior.
3. State your hypothesis before editing.
4. Fix the smallest responsible piece of code.
5. Verify the happy path and at least one failure path.
6. Add a regression test when appropriate.

Open `debugging/lesson-10/README.md` for the challenge details. The reference solution is in `solutions/lesson-10/`.

## Completion criteria
- [ ] I can explain the concept in my own words.
- [ ] I can find the responsible file without being told its full path.
- [ ] I reproduced and fixed the bug.
- [ ] I verified the fix and can explain why it works.
