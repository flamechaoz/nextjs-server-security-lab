# Debugging Lab 09: Authentication and sessions

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
Use the interactive login form to create a demo session. Inspect the safe session details and cookie policy, then sign out and verify the session is revoked.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/authentication-sessions` and submit a username.
3. Inspect the displayed user and cookie attributes; notice the cookie value is not exposed to JavaScript.
4. Refresh the session status and confirm the server recognizes the same session.
5. Sign out, then refresh the session status and confirm it is inactive.
6. Inspect `app/api/debug/lesson-09/route.ts` and `lib/demo-session.ts` to trace cookie issuance, lookup, and revocation.

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
Only after attempting the lab, compare your approach with `solutions/lesson-09/SOLUTION.md`.
