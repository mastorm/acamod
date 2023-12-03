import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().min(1).max(100),
  shortCode: z.string().optional(),
  credits: z.coerce.number().pipe(z.number().max(20).min(1).optional()),
});

export type ModuleSchema = z.infer<typeof moduleSchema>;
