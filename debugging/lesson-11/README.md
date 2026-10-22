# Debugging Lab 11: Secrets and server boundaries

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice Route Handler returns a token-like value in its JSON response. The route runs on the server, but the response is delivered to the browser. Remove the private field and return only display-safe data.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/secrets-and-server-boundaries` and fetch the practice response.
3. Inspect `app/api/debug/lesson-11/route.ts` and trace the token-like field into the response body.
4. Remove the private field while preserving the safe app configuration.
5. Fetch again and verify that the response contains no token field.
6. Explain why server-side execution does not make response data private, and how this differs from a client-bundle leak.

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
Only after attempting the lab, compare your approach with `solutions/lesson-11/SOLUTION.md`.
