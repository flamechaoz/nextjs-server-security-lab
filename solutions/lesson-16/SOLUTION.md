# Reference solution — Lesson 16

## Intended reasoning

A component test relies on a CSS class instead of the accessible contract. Render the component with controlled network responses, query the button by role and name, perform the user interaction, and assert the visible updated state.

## Suggested approach

1. Render `TaskManager` with an initial open task.
2. Mock the initial `GET`, successful `PATCH`, and refreshed `GET` responses.
3. Query the open task's `Complete` button with `getByRole`.
4. Click it with `userEvent`.
5. Wait for and assert the visible `Completed` status.
6. Confirm the PATCH request body matches the user action.

## Corrected test

```tsx
const user = userEvent.setup();
render(<TaskManager />);

await screen.findByText("Write an accessible test");
await user.click(screen.getByRole("button", { name: "Complete" }));

await waitFor(() =>
	expect(screen.getByText("Completed")).toBeInTheDocument(),
);
```

The complete fixture also mocks the three fetch responses. The important change is replacing the CSS selector with the accessible query and verifying the resulting user-visible state.

## Review checklist
- Does the test query by accessible role and name?
- Does it use `userEvent` for the interaction?
- Does it wait for asynchronous UI updates?
- Does it assert visible behavior rather than classes or private state?
- Does it verify the important network request contract?

**Instructor note:** This is an editor-based exercise. Accept equivalent tests when they avoid implementation-specific selectors, exercise the user-facing interaction, and assert the resulting UI.
