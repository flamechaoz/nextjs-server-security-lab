# Debugging Lab 02: Server Components vs Client Components

**Estimated time:** 15–25 minutes  
**Mode:** Investigate first; edit only after you can explain the suspected cause.

## Scenario
Open `/component-boundaries` and click the counter. Trace the Server Component in `app/component-boundaries/page.tsx` and the Client Component in `components/BoundaryCounter.tsx`. Then inspect `debugging/lesson-02/broken-component.tsx`: it uses `useState` and `onClick` without a client boundary. Add `"use client";` as the first statement. The page itself should remain a Server Component; App Router pages are server components by default and do not need a `"use server"` directive.

## Your mission

1. Open `/component-boundaries` and click **Increment counter** twice.
2. Inspect the server-rendered page and the interactive counter component; note which file has `"use client"` and which does not.
3. Open `debugging/lesson-02/broken-component.tsx` and identify the hook and event handler that require a client boundary.
4. Add `"use client";` before the imports in the broken exercise file.
5. Compare the repaired file to `components/BoundaryCounter.tsx` and confirm the live demo still works.

## Hints (open one at a time)

<details><summary>Hint 1: Identify what needs the client</summary>
`useState` and `onClick` need a Client Component. A Server Component can render the page and pass serializable props or rendered children into that client boundary.
</details>

<details><summary>Hint 2: Check the directive</summary>
`"use client";` must be the first statement in the client module, before imports. App Router pages are Server Components by default and do not need `"use server"`.
</details>

<details><summary>Hint 3: Keep the boundary small</summary>
Only the interactive counter needs to be a Client Component. Do not add the client directive to the page to make the counter work.
</details>

## Evidence to submit
- [ ] File(s) changed and why
- [ ] Demo interaction observed and explanation of which component owns the state
- [ ] Fix summary
- [ ] Confirmation that the exercise starts with the client directive and the live demo counter still works
- [ ] Explanation of why the page itself remains a Server Component

## Reference solution
Only after attempting the lab, compare your approach with `solutions/lesson-02/SOLUTION.md`.
