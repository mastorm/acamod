import { z } from "zod";

export const createModuleSchema = z.object({
  moduleName: z.string().min(1).max(100),
});
