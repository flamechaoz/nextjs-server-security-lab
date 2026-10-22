# Debugging Lab 14: Jest and Arrange–Act–Assert

**Estimated time:** 15–25 minutes  
**Mode:** Editor-based unit testing; edit the test, then run it.

## Scenario
A test passes for the wrong reason: it asserts a hard-coded `true` value and never calls `canEditTask`. Rewrite the test so it follows Arrange–Act–Assert and a regression in the function makes the test fail.

## Your mission

1. Open `debugging/lesson-14/broken-test.test.ts` and identify the Arrange, Act, and Assert phases.
2. Replace the hard-coded result with a call to `canEditTask(userId, ownerId)`.
3. Keep the existing assertion and confirm it checks the returned value.
4. Run `pnpm exec jest debugging/lesson-14/broken-test.test.ts --testPathIgnorePatterns="^$"`.
5. Temporarily change `canEditTask` to return the wrong value, rerun the focused test, and confirm it fails.

## Hints (open one at a time)

<details><summary>Hint 1: Find the missing phase</summary>
The test has setup and an assertion, but the value being asserted is not produced by the function under test.
</details>

<details><summary>Hint 2: Write the Act step</summary>
Call `canEditTask` with the arranged `userId` and `ownerId`, then store its return value in `result`.
</details>

<details><summary>Hint 3: Verify the test</summary>
If the implementation returns `false` for the owner case, the assertion should fail. A hard-coded `true` cannot detect that regression.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Original focused test output
- [ ] Updated test with separate Arrange, Act, and Assert phases
- [ ] Verification command and passing output
- [ ] Mutation result showing the test fails when the implementation is wrong

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-14/SOLUTION.md`.
