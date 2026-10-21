# Reference solution — Lesson 06

## Intended reasoning

A handler trusts request.json() and creates a task with a missing title. Add schema validation and a clear 400 response; test both valid and invalid requests.

## Suggested approach

1. Reproduce the issue first.
2. Trace the request or value to the responsible handler/service/component.
3. Validate external input at the boundary and keep business rules in testable functions.
4. Return the expected result and a meaningful error for invalid input.
5. Add a regression test for the exact failure mode.

## Review checklist
- Does the fix solve the reported bug rather than hide it?
- Are status codes and response bodies consistent?
- Are invalid inputs handled safely?
- Is sensitive data kept out of client-visible output and logs?
- Would the test fail if the original bug were reintroduced?

**Instructor note:** Some lessons are design/code-review exercises rather than a single one-line patch. Accept alternative solutions when learners justify trade-offs and provide evidence.
