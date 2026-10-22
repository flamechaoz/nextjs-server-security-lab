import { NextResponse } from "next/server";

// INTENTIONAL BUG: relies on Proxy and does not verify the session here.
export function GET(request: Request) {
  const proxyAction = request.headers.get("x-demo-proxy-action") ?? "continue";
  return NextResponse.json({
    handledBy: "lesson-13-route-handler",
    proxyAction,
    protectedData: "demo-only",
    routeLevelSessionCheck: false,
  });
}
