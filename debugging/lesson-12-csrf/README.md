# Debugging Lab 12B: Cross-site request forgery

**Estimated time:** 15–25 minutes  
**Mode:** Reproduce first; edit only after you can explain why the request is trusted.

## Scenario

Open `/common-web-vulnerabilities/csrf` for the interactive playground. The practice endpoint has two intentional defects: it checks a Promise returned by `cookies()` instead of awaiting it, and it compares only hostnames when checking the request Origin.

The endpoint only simulates an update; it does not persist profile data. The playground's lab-only header lets the server exercise different Origin values because browser JavaScript cannot set the real `Origin` header.

## Your mission

1. Run the app with `APP_ORIGIN=http://localhost:3000 pnpm dev` and open `/common-web-vulnerabilities/csrf`.
2. Sign out at `/authentication-sessions`, select **This origin**, and submit. Explain why the Promise returned by `cookies()` makes `if (!cookie)` fail to detect a missing cookie.
3. Sign in at `/authentication-sessions`, return to the playground, select **Same host, different port**, and submit. The hostname-only check accepts this different origin.
4. Select **Different host** and submit; this request should be rejected even before you fix the code.
5. Await `cookies()` and validate the session cookie. Compare the complete Origin to `APP_ORIGIN`, including scheme, hostname, and port.
6. Repeat all three cases: signed-out same-origin returns 401, signed-in different-port returns 403, and signed-in trusted-origin succeeds.

## Hints

<details><summary>Hint 1: Find the missing boundary</summary>
`cookies()` is asynchronous in this Next.js version. A Promise object is truthy even when the cookie store it will resolve to has no session cookie.
</details>

<details><summary>Hint 2: Compare origins exactly</summary>
An origin includes scheme, host, and port. Comparing only `URL.hostname` treats different ports as the same origin.
</details>

<details><summary>Hint 3: Keep the controls separate</summary>
Await and validate the actual session cookie, compare against the exact configured origin, validate the form, and only then simulate the update.
</details>

## Evidence to submit

- [ ] Signed-out same-origin response before and after the fix
- [ ] Same-host/different-port response before and after the fix
- [ ] Trusted-origin success after the fix
- [ ] Explanation of why both checks belong before a state change

## Reference solution

After attempting the lab, compare your approach with `solutions/lesson-12/SOLUTION.md` under the CSRF activity section.