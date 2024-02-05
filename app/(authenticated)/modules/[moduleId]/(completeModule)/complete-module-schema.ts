import { z } from "zod";

export const completeModuleSchema = z.object({
  completedDate: z.string(),
  passed: z.boolean(),
  grade: z.coerce.number().min(0).max(6),
  attempts: z.coerce.number(),
});

export type CompleteModuleSchemaType = z.infer<typeof completeModuleSchema>;
