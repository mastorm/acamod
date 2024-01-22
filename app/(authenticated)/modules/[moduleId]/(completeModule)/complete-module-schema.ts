import { z } from "zod";

export const completeModuleSchema = z.object({
  completedDate: z.string(),
  passed: z.boolean(),
  points: z.coerce.number().min(0).max(100),
  attempts: z.coerce.number(),
});

export type CompleteModuleSchemaType = z.infer<typeof completeModuleSchema>;
