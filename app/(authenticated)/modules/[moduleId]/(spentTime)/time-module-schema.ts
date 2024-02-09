import { z } from "zod";

export const timeSpentSchema = z.object({
  hoursSpent: z.coerce
    .number()
    .min(0, { message: "Stunden müssen positiv sein" })
    .max(500, { message: "es können max. 500 Stunden angegeben werden" }),
});

export type TimeSpentSchemaType = z.infer<typeof timeSpentSchema>;
