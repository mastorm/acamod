import { z } from "zod";

export const isBestAnswerSchema = z.object({
  isBestAnswer: z.boolean(),
});

export type IsBestAnswerSchema = z.infer<typeof isBestAnswerSchema>;
