# Debugging Lab 01: Introduction to the Next.js server

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice endpoint `/api/debug/lesson-01` returns the wrong message and status. Compare the exercise source at `debugging/lesson-01/broken-route.ts` with `app/api/hello/route.ts`, fix the exercise response, and verify it in the browser or curl.

## Your mission

1. Run the app with `npm run dev` if the challenge targets a live route.
2. Reproduce the behavior and write down expected vs. actual output.
3. Search the repository for the route path, response text, function name, or component involved.
4. Trace the data flow from request/input to handler to service to response/output.
5. Fix the bug with the smallest reasonable change.
6. Run the relevant test(s), then test a negative or boundary case.

## Hints (open one at a time)

<details><summary>Hint 1: Find the entry point</summary>
Start from the URL or UI action. App Router route segments map to folders under `app/`; a Route Handler is exported from `route.ts`.
</details>

<details><summary>Hint 2: Trace the value</summary>
Follow the value through each function call. Check its type, validation, and whether asynchronous values are awaited.
</details>

<details><summary>Hint 3: Verify the contract</summary>
Compare status code, response body, side effects, and failure behavior with the intended contract.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Reproduction steps and original output
- [ ] Fix summary
- [ ] Verification command or request and output
- [ ] Regression test or explanation of why one is not applicable

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-01/SOLUTION.md`.
