# Debugging Lab 16: Testing user-facing component behavior

**Estimated time:** 15–25 minutes  
**Mode:** Editor-based component testing; edit the test, then run it.

## Scenario
A `TaskManager` test uses a CSS selector that is not part of the user-facing contract. Replace it with an accessible role/name query, perform the completion interaction with `userEvent`, and verify the visible completed state.

## Your mission

1. Open `debugging/lesson-16/broken-component.test.tsx` and `components/TaskManager.tsx`.
2. Trace the initial `GET`, the `PATCH`, and the reload response supplied by the mock.
3. Replace `container.querySelector(".green-button")` with `screen.getByRole("button", { name: "Complete" })`.
4. Use `userEvent` to click the button.
5. Assert the visible `Completed` status after the mocked reload.
6. Run `pnpm exec jest debugging/lesson-16/broken-component.test.tsx --testPathIgnorePatterns="^$"`.

## Hints (open one at a time)

<details><summary>Hint 1: Trace the async states</summary>
The component fetches tasks on mount, sends a PATCH when the user clicks Complete, and fetches the updated list. The fixture already supplies those responses.
</details>

<details><summary>Hint 2: Query the accessible control</summary>
The open task's button has the accessible name `Complete`. Styling classes are implementation details.
</details>

<details><summary>Hint 3: Assert the result</summary>
After the PATCH and reload finish, the task's visible status is `Completed` and its button is named `Reopen`.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Original failing query and why it is brittle
- [ ] Accessible query and user interaction
- [ ] Visible result assertion
- [ ] Verification command and passing output

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-16/SOLUTION.md`.
