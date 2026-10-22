# Debugging Lab 13: Proxy and request protection

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
A route is guarded by a cookie-presence check in Proxy. Use the playground to observe Proxy block requests without a cookie and continue, redirect, or rewrite requests with one. The practice Route Handler still lacks its own session check: a fabricated cookie bypasses Proxy, so fix that independent boundary too.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/proxy-and-request-protection` signed out and send a request; observe the Proxy response.
3. Sign in at `/authentication-sessions`, return to the playground, and try continue, redirect, and rewrite.
4. Inspect `proxy.ts` and `app/api/debug/lesson-13/route.ts` to trace each request path.
5. Send a fabricated cookie with curl to demonstrate that cookie presence alone is not authentication.
6. Add an independent session check in the handler; do not rely on a header that only Proxy adds.
7. Verify the fabricated cookie is rejected by the handler.

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
Only after attempting the lab, compare your approach with `solutions/lesson-13/SOLUTION.md`.
