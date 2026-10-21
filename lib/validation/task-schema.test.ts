import { createTaskSchema, updateTaskSchema } from "@/lib/validation/task-schema";
describe("task schemas", () => {
  it("trims a valid title", () => expect(createTaskSchema.parse({ title: "  Learn routes " }).title).toBe("Learn routes"));
  it("rejects an empty title", () => expect(createTaskSchema.safeParse({ title: "   " }).success).toBe(false));
  it("rejects an update with no fields", () => expect(updateTaskSchema.safeParse({}).success).toBe(false));
  it("accepts a completion update", () => expect(updateTaskSchema.safeParse({ completed: true }).success).toBe(true));
});
