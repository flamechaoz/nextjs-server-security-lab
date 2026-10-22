import {
  clearDemoSessionsForTests,
  createDemoSession,
  getDemoSession,
  revokeDemoSession,
} from "@/lib/demo-session";

describe("demo session store", () => {
  afterEach(() => clearDemoSessionsForTests());

  it("creates an opaque session for the supplied demo username", () => {
    const { id, session } = createDemoSession("learner");

    expect(id).toMatch(/^[A-Za-z0-9_-]{40,}$/);
    expect(session).toMatchObject({
      userId: "demo-user-001",
      username: "learner",
      role: "learner",
    });
    expect(getDemoSession(id)).toEqual(session);
  });

  it("revokes a session", () => {
    const { id } = createDemoSession("learner");

    revokeDemoSession(id);

    expect(getDemoSession(id)).toBeUndefined();
  });
});
