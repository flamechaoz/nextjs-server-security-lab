# Debugging Lab 10: Authorization and ownership

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
Module 9 establishes the demo login session. The Module 10 practice API requires that session, but a signed-in user can still read another user's task because the route does not check ownership.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/authentication-sessions` and sign in with a username.
3. Open `/authorization-and-ownership` and request task IDs `1` and `2`.
4. Confirm task `1` belongs to the signed-in demo user, while task `2` belongs to a different user but is still returned.
5. Add an owner check in `app/api/debug/lesson-10/route.ts` using the Module 9 session's user ID.
6. Verify signed-out requests return 401, owned task `1` succeeds, and task `2` is denied.

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
Only after attempting the lab, compare your approach with `solutions/lesson-10/SOLUTION.md`.
