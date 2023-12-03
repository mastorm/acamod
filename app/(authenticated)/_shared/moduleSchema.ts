import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().min(1).max(100),
  shortCode: z.string().optional(),
  credits: z.coerce
    .number()
    .optional()
    .pipe(z.number().max(20).min(0).optional()),
});

export type ModuleSchema = z.infer<typeof moduleSchema>;
