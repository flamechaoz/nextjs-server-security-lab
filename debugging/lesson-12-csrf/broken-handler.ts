import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE } from "@/lib/demo-session";

export async function POST(request: Request) {
  // INTENTIONAL BUG
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieStore: any = cookies();
  const cookie = cookieStore.get(DEMO_SESSION_COOKIE);

  if (!cookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trustedOrigin =
    process.env.APP_ORIGIN ??
    (process.env.NODE_ENV === "development"
      ? new URL(request.url).origin
      : undefined);
  if (!trustedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const submittedOrigin = process.env.NODE_ENV === "production"
    ? request.headers.get("origin")
    : request.headers.get("x-csrf-lab-origin") ?? request.headers.get("origin");
  let submittedHost: string;
  let trustedHost: string;
  try {
    if (!submittedOrigin) throw new Error("Missing Origin");
    submittedHost = new URL(submittedOrigin).hostname;
    trustedHost = new URL(trustedOrigin).hostname;
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // INTENTIONAL BUG: hostname equality ignores the origin's scheme and port.
  if (submittedHost !== trustedHost) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const displayName = formData.get("displayName");
  if (typeof displayName !== "string" || displayName.trim().length === 0) {
    return NextResponse.json({ error: "Invalid display name" }, { status: 400 });
  }

  return NextResponse.json({
    updated: true,
    displayName: displayName.trim(),
    note: "Demo only; no profile data is persisted.",
  });
}