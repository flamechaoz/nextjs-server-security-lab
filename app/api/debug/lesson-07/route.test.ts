jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { GET } from "@/app/api/debug/lesson-07/route";

function makeRequest(url: string): Request {
  return { url } as Request;
}

describe("GET /api/debug/lesson-07", () => {
  it("returns a successful response for the existing task", async () => {
    const response = GET(makeRequest("http://localhost/api/debug/lesson-07?id=1"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      data: { id: 1, title: "Sample task" },
    });
  });

  it("reproduces the incorrect server-error status for a missing task", async () => {
    const response = GET(makeRequest("http://localhost/api/debug/lesson-07?id=999"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Task not found",
    });
  });

  it("rejects an invalid task ID", async () => {
    const response = GET(
      makeRequest("http://localhost/api/debug/lesson-07?id=invalid"),
    );

    expect(response.status).toBe(400);
  });
});
