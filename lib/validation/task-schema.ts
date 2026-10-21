import { z } from "zod";
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120, "Title must be 120 characters or fewer")
});
export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  completed: z.boolean().optional()
}).refine((value) => value.title !== undefined || value.completed !== undefined, { message: "Provide title or completed" });
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
