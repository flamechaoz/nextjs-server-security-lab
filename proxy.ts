import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/lib/demo-session";

export function proxy(request: NextRequest) {
  // INTENTIONAL BUG: cookie presence is not proof that the session is valid.
  if (!request.cookies.get(DEMO_SESSION_COOKIE)?.value) {
    return NextResponse.json(
      { error: "A Module 9 session cookie is required to reach this route." },
      { status: 401 },
    );
  }

  const action = request.nextUrl.searchParams.get("action") ?? "continue";
  const target = new URL("/api/debug/lesson-13-target", request.url);
  target.searchParams.set("via", action);

  if (action === "redirect") {
    return NextResponse.redirect(target);
  }

  if (action === "rewrite") {
    return NextResponse.rewrite(target);
  }

  if (action !== "continue") {
    return NextResponse.json({ error: "Unknown Proxy action" }, { status: 400 });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-demo-proxy-action", action);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/api/debug/lesson-13/:path*"],
};
