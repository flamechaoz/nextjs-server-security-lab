import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.json({
    handledBy: "proxy-target-handler",
    proxyAction:
      url.searchParams.get("via") ?? url.searchParams.get("action"),
  });
}
