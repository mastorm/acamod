import { z } from "zod";

export const answerSchema = z.object({
  content: z.string().min(1, "Inhalt ist erforderlich").max(1000, {
    message: "Inhalt ist zu lang.",
  }),
  isBestAnswer: z.boolean().optional(),
});

export type AnswerSchema = z.infer<typeof answerSchema>;
