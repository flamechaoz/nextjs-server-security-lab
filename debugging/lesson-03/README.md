# Debugging Lab 03: Route Handlers and HTTP

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The live POST playground sends a real JSON request to `/api/debug/lesson-03`. The handler successfully processes it but returns HTTP 200. Update the actual practice Route Handler to return `201 Created`, submit the request again, and verify the response status displayed by the client.

## Your mission

1. Open `/route-handlers-http`, submit the prefilled form, and record the status and JSON response.
2. Inspect `components/RouteHandlerPlayground.tsx` to see how the client sends the POST and reads `response.status`.
3. Open `app/api/debug/lesson-03/route.ts` and find the successful POST response.
4. Change its HTTP status from 200 to 201.
5. Submit again and verify the client displays `201 Created`.
6. Explain why the status belongs to the HTTP response and why invalid requests should not return a success status.

## Hints (open one at a time)

<details><summary>Hint 1: Find the entry point</summary>
Start from the form submit action. Inspect the browser Network panel or the playground status, then open the matching Route Handler under `app/api/debug/lesson-03/route.ts`.
</details>

<details><summary>Hint 2: Trace the value</summary>
The Client Component uses `fetch` with `method: "POST"` and a JSON body. The Route Handler parses the request and creates the response.
</details>

<details><summary>Hint 3: Verify the contract</summary>
For a successful resource creation, return 201 Created. Keep malformed or invalid requests on a 4xx status path.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Reproduction steps and original output
- [ ] Fix summary
- [ ] Verification command or request and output
- [ ] Regression test or explanation of why one is not applicable

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-03/SOLUTION.md`.
