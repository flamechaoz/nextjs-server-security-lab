# Debugging Lab 06: Trim before validating

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
The practice API route uses Zod, but a title containing only spaces is accepted as valid. The string has length, but no meaningful characters. Trim it before applying the minimum-length constraint.

## Your mission

1. Run the app with `npm run dev`.
2. Open `/request-validation-with-zod` and submit the prefilled whitespace-only title.
3. Inspect `app/api/debug/lesson-06/route.ts` and find the Zod schema.
4. Apply `trim()` before `min(1)` so whitespace-only input is rejected.
5. Submit again and verify the response changes from HTTP 201 to HTTP 400.
6. Run the relevant test(s) and explain why trimming must happen before the minimum-length check.

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
Only after attempting the lab, compare your approach with `solutions/lesson-06/SOLUTION.md`.
