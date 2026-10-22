# Debugging Lab 12: Common web vulnerabilities

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice endpoint accepts any `returnTo` value and echoes it as the destination. Use the playground to reproduce an open redirect with an external or protocol-relative URL, then change the handler to allow only a safe local path. The playground displays the proposed destination without navigating there.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/common-web-vulnerabilities` and submit `/dashboard`, `https://example.test`, and `//example.test`.
3. Inspect the returned destination; the playground does not follow it.
4. Open `app/api/debug/lesson-12/route.ts` and trace `returnTo` into `redirectTo`.
5. Keep safe local paths and substitute a safe local fallback for external or protocol-relative destinations.
6. Run the relevant tests and repeat all three playground cases.

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
Only after attempting the lab, compare your approach with `solutions/lesson-12/SOLUTION.md`.
