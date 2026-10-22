import { randomBytes } from "node:crypto";

export const DEMO_SESSION_COOKIE = "next-lab-demo-session";
export const DEMO_SESSION_MAX_AGE = 30 * 60;

export type DemoSession = {
  userId: string;
  username: string;
  role: string;
  expiresAt: number;
};

const sessions = new Map<string, DemoSession>();

export function createDemoSession(username: string) {
  const id = randomBytes(32).toString("base64url");
  const session: DemoSession = {
    userId: "demo-user-001",
    username,
    role: "learner",
    expiresAt: Date.now() + DEMO_SESSION_MAX_AGE * 1000,
  };

  sessions.set(id, session);
  return { id, session };
}

export function getDemoSession(id: string | undefined) {
  if (!id) return undefined;

  const session = sessions.get(id);
  if (session && session.expiresAt <= Date.now()) {
    sessions.delete(id);
    return undefined;
  }

  return session;
}

export function getDemoSessionCookieId(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${DEMO_SESSION_COOKIE}=`));

  return cookie?.slice(DEMO_SESSION_COOKIE.length + 1);
}

export function getDemoSessionFromRequest(request: Request) {
  return getDemoSession(getDemoSessionCookieId(request));
}

export function revokeDemoSession(id: string | undefined) {
  if (id) sessions.delete(id);
}

export function clearDemoSessionsForTests() {
  sessions.clear();
}
