import { z } from "zod";

export const goalSchema = z.object({
  targetDate: z.string().optional(),
});

export type GoalSchema = z.infer<typeof goalSchema>;
