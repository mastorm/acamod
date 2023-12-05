import { z } from "zod";

export const createGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, "Der Gruppenname darf nicht leer sein")
    .max(100, "Der Gruppenname ist zu lang"),
});
