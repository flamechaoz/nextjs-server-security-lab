# Lesson 05: Dynamic routes and params

## Learning objectives
By the end of this lesson, you should be able to explain the core concept, find the relevant code in the project, and verify behavior with a repeatable check.

## Part A — Learn and implement

### Goal
Read and validate a route parameter.

### Start here
Inspect: `app/api/tasks/[id]/route.ts`.

### Guided activity
Request /api/tasks/1 and inspect app/api/tasks/[id]/route.ts. Trace context.params to parseId and findTask.

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
The handler treats the string ID as a number without validating it, or forgets to await params. Fix parsing and verify /api/tasks/nope returns 400.

### Rules
1. Reproduce the bug and record the actual output.
2. Find the file that handles the request or owns the behavior.
3. State your hypothesis before editing.
4. Fix the smallest responsible piece of code.
5. Verify the happy path and at least one failure path.
6. Add a regression test when appropriate.

Open `debugging/lesson-05/README.md` for the challenge details. The reference solution is in `solutions/lesson-05/`.

## Completion criteria
- [ ] I can explain the concept in my own words.
- [ ] I can find the responsible file without being told its full path.
- [ ] I reproduced and fixed the bug.
- [ ] I verified the fix and can explain why it works.

## Guided trace: URL to processed response

For `/api/tasks/1`, Next.js matches the `[id]` folder and invokes its `GET` export. The route parameter is a string (`"1"`), not a number. The handler awaits `context.params`, validates the string, converts it to a safe positive integer, calls `findTask(id)`, and returns either the processed task or a meaningful error.

Try these requests:

```bash
curl -i http://localhost:3000/api/tasks/1
curl -i http://localhost:3000/api/tasks/nope
curl -i http://localhost:3000/api/tasks/9999
```

Expected: 200 for an existing task, 400 for a malformed ID, and 404 for a well-formed but missing ID.
