jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

jest.mock("@/lib/demo-session", () => ({
  getDemoSessionFromRequest: jest.fn(),
}));

import { GET } from "@/app/api/debug/lesson-10/route";
import { getDemoSessionFromRequest } from "@/lib/demo-session";

const getSessionMock = jest.mocked(getDemoSessionFromRequest);

function makeRequest(url: string) {
  return { url } as Request;
}

describe("GET /api/debug/lesson-10", () => {
  afterEach(() => jest.resetAllMocks());

  it("requires a Module 9 session", async () => {
    getSessionMock.mockReturnValue(undefined);

    const response = GET(makeRequest("http://localhost/api/debug/lesson-10?id=1"));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("allows the signed-in user to read their own task", async () => {
    getSessionMock.mockReturnValue({
      userId: "demo-user-001",
      username: "learner",
      role: "learner",
      expiresAt: Date.now() + 1000,
    });

    const response = GET(makeRequest("http://localhost/api/debug/lesson-10?id=1"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      task: { id: 1, ownerId: "demo-user-001" },
    });
  });

  it("reproduces the missing ownership check for another user's task", async () => {
    getSessionMock.mockReturnValue({
      userId: "demo-user-001",
      username: "learner",
      role: "learner",
      expiresAt: Date.now() + 1000,
    });

    const response = GET(makeRequest("http://localhost/api/debug/lesson-10?id=2"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      task: { id: 2, ownerId: "demo-user-002" },
    });
  });
});
