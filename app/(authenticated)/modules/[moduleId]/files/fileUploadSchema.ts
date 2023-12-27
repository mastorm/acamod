import { z } from "zod";

export const fileUploadSchema = z.object({
  files: z.array(z.instanceof(File)),
});

export type FileUploadSchema = z.infer<typeof fileUploadSchema>;
