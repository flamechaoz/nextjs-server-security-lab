# Debugging Lab 04: Server data and response boundaries

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice API route includes a token-like value in its JSON response. Although the route runs on the server, the response is delivered to the browser and exposes every included field.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/server-data-fetching` and submit a request; inspect the JSON response.
3. Open `app/api/debug/lesson-04/route.ts` and trace the route's response fields.
4. Remove the token-like field while keeping the display-safe app name.
5. Submit the request again and confirm the response no longer contains the token.
6. Run the relevant test(s), then verify the response in the playground.

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
Only after attempting the lab, compare your approach with `solutions/lesson-04/SOLUTION.md`.
