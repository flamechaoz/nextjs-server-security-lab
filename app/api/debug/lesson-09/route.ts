import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createDemoSession,
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_MAX_AGE,
  getDemoSessionCookieId,
  getDemoSessionFromRequest,
  revokeDemoSession,
} from "@/lib/demo-session";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(60),
});

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: DEMO_SESSION_MAX_AGE,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A username between 1 and 60 characters is required" },
      { status: 400 },
    );
  }

  const { id, session } = createDemoSession(parsed.data.username);
  const response = NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      username: session.username,
      role: session.role,
    },
  });
  response.cookies.set(DEMO_SESSION_COOKIE, id, getCookieOptions());
  return response;
}

export function GET(request: Request) {
  const session = getDemoSessionFromRequest(request);
  return NextResponse.json({
    authenticated: Boolean(session),
    user: session
      ? {
          userId: session.userId,
          username: session.username,
          role: session.role,
        }
      : null,
    cookie: {
      name: DEMO_SESSION_COOKIE,
      present: Boolean(session),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      expiresAt: session ? new Date(session.expiresAt).toISOString() : null,
    },
  });
}

export function DELETE(request: Request) {
  revokeDemoSession(getDemoSessionCookieId(request));
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(DEMO_SESSION_COOKIE, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  return response;
}
