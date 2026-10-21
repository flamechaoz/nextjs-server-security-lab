import { canEditTask } from "@/lib/task-rules";
describe("canEditTask", () => {
  it("allows the owner", () => expect(canEditTask("user-1", "user-1")).toBe(true));
  it("rejects a different user", () => expect(canEditTask("user-2", "user-1")).toBe(false));
  it("rejects an empty user id", () => expect(canEditTask("", "")).toBe(false));
});
