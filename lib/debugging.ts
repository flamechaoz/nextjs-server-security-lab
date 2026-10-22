import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type DebugExercise = {
  file: string;
  endpoint: string;
  code: string;
};

const exerciseFiles: Record<number, string> = {
  1: "debugging/lesson-01/broken-route.ts",
  2: "debugging/lesson-02/broken-component.tsx",
  3: "app/api/debug/lesson-03/route.ts",
  4: "app/api/debug/lesson-04/route.ts",
  5: "app/api/debug/tasks/[id]/route.ts",
  6: "app/api/debug/lesson-06/route.ts",
  7: "app/api/debug/lesson-07/route.ts",
  8: "app/api/debug/lesson-08/route.ts",
  9: "app/api/debug/lesson-09/route.ts",
  10: "app/api/debug/lesson-10/route.ts",
  11: "app/api/debug/lesson-11/route.ts",
  12: "app/api/debug/lesson-12/route.ts",
  13: "app/api/debug/lesson-13/route.ts",
  14: "debugging/lesson-14/broken-test.test.ts",
  15: "debugging/lesson-15/broken-tests.test.ts",
  16: "debugging/lesson-16/broken-component.test.tsx",
};

export async function getDebugExercise(id: number): Promise<DebugExercise> {
  const file = exerciseFiles[id];
  if (!file) {
    throw new Error(`No debugging exercise is configured for lesson ${id}.`);
  }

  const endpoint = id === 2
    ? "/component-boundaries"
    : id === 3
      ? "/route-handlers-http"
    : id === 4
      ? "/server-data-fetching"
    : id === 6
      ? "/request-validation-with-zod"
    : id === 7
      ? "/errors-and-status-codes"
    : id === 8
      ? "/service-layer-design"
    : id === 9
      ? "/authentication-sessions"
    : id === 10
      ? "/authorization-and-ownership"
    : id === 11
      ? "/secrets-and-server-boundaries"
    : id === 12
      ? "/common-web-vulnerabilities"
    : id === 13
      ? "/proxy-and-request-protection"
    : id === 5
      ? "/api/debug/tasks/2"
      : `/api/debug/lesson-${String(id).padStart(2, "0")}`;
  const code = await readFile(join(/*turbopackIgnore: true*/ process.cwd(), file), "utf8");

  return { file, endpoint, code };
}
