# Debugging Lab 07: Errors and HTTP semantics

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The lesson's practice API accepts an `id` query parameter. Task `1` exists, but an unknown task ID is incorrectly reported as HTTP 500. A missing resource is an expected condition and should return HTTP 404.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/errors-and-status-codes` and request the prefilled unknown task ID.
3. Open `app/api/debug/lesson-07/route.ts` and trace the query parameter to the not-found response.
4. Change the not-found status to HTTP 404 without changing its safe error body.
5. Submit again and confirm the missing ID returns HTTP 404.
6. Request task ID `1` and confirm the existing-task response remains HTTP 200.

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
Only after attempting the lab, compare your approach with `solutions/lesson-07/SOLUTION.md`.
