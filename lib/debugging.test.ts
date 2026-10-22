import { getDebugExercise } from "@/lib/debugging";

describe("debug exercises", () => {
  it("provides a readable source file and reproduction endpoint for every lesson", async () => {
    for (let id = 1; id <= 16; id += 1) {
      const exercise = await getDebugExercise(id);

      expect(exercise.file).toBeTruthy();
      expect(exercise.code.trim()).not.toBe("");
      expect(exercise.endpoint).toMatch(
        /^(\/api\/debug\/|\/component-boundaries$|\/route-handlers-http$|\/server-data-fetching$|\/request-validation-with-zod$|\/errors-and-status-codes$|\/service-layer-design$|\/authentication-sessions$|\/authorization-and-ownership$|\/secrets-and-server-boundaries$|\/common-web-vulnerabilities$|\/proxy-and-request-protection$)/,
      );
    }
  });

  it("uses the lesson 1 exercise source for its live practice endpoint", async () => {
    const exercise = await getDebugExercise(1);

    expect(exercise.file).toBe("debugging/lesson-01/broken-route.ts");
    expect(exercise.code).toContain('lesson: 0');
  });

  it("connects the dynamic route challenge to its matching source and endpoint", async () => {
    const exercise = await getDebugExercise(5);

    expect(exercise.file).toBe("app/api/debug/tasks/[id]/route.ts");
    expect(exercise.endpoint).toBe("/api/debug/tasks/2");
    expect(exercise.code).toContain("_context: Context");
  });

  it("links the component boundary exercise to its live interactive demo", async () => {
    const exercise = await getDebugExercise(2);

    expect(exercise.file).toBe("debugging/lesson-02/broken-component.tsx");
    expect(exercise.endpoint).toBe("/component-boundaries");
    expect(exercise.code).toContain("useState");
    expect(exercise.code).not.toContain('"use client"');
  });

  it("links the Route Handler exercise to the live POST playground and actual handler", async () => {
    const exercise = await getDebugExercise(3);

    expect(exercise.file).toBe("app/api/debug/lesson-03/route.ts");
    expect(exercise.endpoint).toBe("/route-handlers-http");
    expect(exercise.code).toContain('{ status: 200 }');
  });

  it("links the server data exercise to its response-inspection playground", async () => {
    const exercise = await getDebugExercise(4);

    expect(exercise.file).toBe("app/api/debug/lesson-04/route.ts");
    expect(exercise.endpoint).toBe("/server-data-fetching");
    expect(exercise.code).toContain("token");
  });

  it("links the request validation exercise to its whitespace-input playground", async () => {
    const exercise = await getDebugExercise(6);

    expect(exercise.file).toBe("app/api/debug/lesson-06/route.ts");
    expect(exercise.endpoint).toBe("/request-validation-with-zod");
    expect(exercise.code).toContain("z.string().min(1)");
  });

  it("links the error status exercise to its missing-task playground", async () => {
    const exercise = await getDebugExercise(7);

    expect(exercise.file).toBe("app/api/debug/lesson-07/route.ts");
    expect(exercise.endpoint).toBe("/errors-and-status-codes");
    expect(exercise.code).toContain('searchParams.get("id")');
    expect(exercise.code).toContain("{ status: 500 }");
  });

  it("links the service layer exercise to its response comparison playground", async () => {
    const exercise = await getDebugExercise(8);

    expect(exercise.file).toBe("app/api/debug/lesson-08/route.ts");
    expect(exercise.endpoint).toBe("/service-layer-design");
    expect(exercise.code).toContain("{ tasks: [] }");
  });

  it("links the authentication exercise to its interactive session page", async () => {
    const exercise = await getDebugExercise(9);

    expect(exercise.file).toBe("app/api/debug/lesson-09/route.ts");
    expect(exercise.endpoint).toBe("/authentication-sessions");
    expect(exercise.code).toContain("createDemoSession");
  });

  it("links the ownership exercise to its session-protected playground", async () => {
    const exercise = await getDebugExercise(10);

    expect(exercise.file).toBe("app/api/debug/lesson-10/route.ts");
    expect(exercise.endpoint).toBe("/authorization-and-ownership");
    expect(exercise.code).toContain("getDemoSessionFromRequest");
    expect(exercise.code).toContain("INTENTIONAL BUG");
  });

  it("links the secrets exercise to its API response playground", async () => {
    const exercise = await getDebugExercise(11);

    expect(exercise.file).toBe("app/api/debug/lesson-11/route.ts");
    expect(exercise.endpoint).toBe("/secrets-and-server-boundaries");
    expect(exercise.code).toContain("token");
  });

  it("links the common vulnerabilities exercise to its redirect playground", async () => {
    const exercise = await getDebugExercise(12);

    expect(exercise.file).toBe("app/api/debug/lesson-12/route.ts");
    expect(exercise.endpoint).toBe("/common-web-vulnerabilities");
    expect(exercise.code).toContain('searchParams.get("returnTo")');
  });

  it("links the Proxy exercise to its request-flow playground", async () => {
    const exercise = await getDebugExercise(13);

    expect(exercise.file).toBe("app/api/debug/lesson-13/route.ts");
    expect(exercise.endpoint).toBe("/proxy-and-request-protection");
    expect(exercise.code).toContain("does not verify the session");
  });

  it("rejects lesson IDs without a configured exercise", async () => {
    await expect(getDebugExercise(21)).rejects.toThrow(
      "No debugging exercise is configured for lesson 21.",
    );
  });
});
