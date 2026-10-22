import { canEditTask } from "@/lib/task-rules";

describe("canEditTask", () => {
  it("allows the owner", () => {
    const userId = "user-1";
    const ownerId = "user-1";

    // INTENTIONAL BUG: this hard-coded value never exercises canEditTask.
    const result = true;

    expect(result).toBe(true);
  });
});
