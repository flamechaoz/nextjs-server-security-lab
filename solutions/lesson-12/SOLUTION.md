# Reference solution — Lesson 12

## Intended reasoning

An endpoint accepts an arbitrary redirect URL or constructs an unsafe query. Restrict the input to an allowlist or use parameterized queries, then add a regression test.

## Suggested approach

1. Reproduce the issue first.
2. Trace the request or value to the responsible handler/service/component.
3. Validate external input at the boundary and keep business rules in testable functions.
4. Return the expected result and a meaningful error for invalid input.
5. Add a regression test for the exact failure mode.

## Review checklist
- Does the fix solve the reported bug rather than hide it?
- Are status codes and response bodies consistent?
- Are invalid inputs handled safely?
- Is sensitive data kept out of client-visible output and logs?
- Would the test fail if the original bug were reintroduced?

**Instructor note:** Some lessons are design/code-review exercises rather than a single one-line patch. Accept alternative solutions when learners justify trade-offs and provide evidence.

## CSRF activity: suggested fix

For the browser-only demo endpoint, compare the complete `Origin` header with a configured public origin, then await and validate the cookie-backed session before reading the form or performing the simulated update:

```ts
const trustedOrigin = process.env.APP_ORIGIN;
if (!trustedOrigin || request.headers.get("origin") !== trustedOrigin) {
	return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const cookieStore = await cookies();
const authCookie = cookieStore.get(DEMO_SESSION_COOKIE);
const session = getDemoSession(authCookie?.value);
if (!session) {
	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

`cookies()` returns a Promise in this Next.js version, so testing the Promise itself does not establish whether a session cookie exists. Origin validation must compare the complete origin, not just the hostname; ports and schemes are part of the origin. Set `APP_ORIGIN` to the exact public origin, for example `http://localhost:3000` during local development. Keep input validation as a separate check. A synchronizer token is another suitable strategy when the application must support requests without an Origin header. `SameSite` cookies and CORS are not replacements for a deliberate CSRF policy.
