import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich").max(50, {
    message: "Der Titel darf maximal 100 Zeichen lang sein.",
  }),
  content: z.string().min(1, "Inhalt ist erforderlich").max(1000, {
    message: "Inhalt ist zu lang.",
  }),
});

export type QuestionSchema = z.infer<typeof questionSchema>;
