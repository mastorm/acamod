import { z } from "zod";

export const inviteUserToGroupSchema = z.object({
  email: z.string().email(),
  groupId: z.string(),
});

export type InviteUserToGroupSchema = z.infer<typeof inviteUserToGroupSchema>;
