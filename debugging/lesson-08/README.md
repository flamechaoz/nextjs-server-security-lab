# Debugging Lab 08: Use the shared service layer

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice task-list route returns a hard-coded empty array in a `tasks` field. The real task API uses the shared service and returns a `data` array plus a `count`. Update the practice route to use the service so task retrieval and response behavior stay consistent.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/service-layer-design` and compare the practice response with `/api/tasks`.
3. Inspect `app/api/debug/lesson-08/route.ts` and `lib/services/task-service.ts`.
4. Replace the hard-coded response with a call to the shared `listTasks()` service.
5. Return the same `{ data, count }` response contract as `/api/tasks`.
6. Refresh the playground and confirm both endpoints return equivalent task data.

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
Only after attempting the lab, compare your approach with `solutions/lesson-08/SOLUTION.md`.
