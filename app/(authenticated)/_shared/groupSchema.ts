import { z } from "zod";

export const groupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Der Gruppenname darf nicht leer sein." })
    .max(100, {
      message: "Der Gruppenname darf maximal 100 Zeichen lang sein.",
    }),
});

export type GroupSchema = z.infer<typeof groupSchema>;
