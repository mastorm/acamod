"use server";

import { db } from "@/lib/database";
import { groupMemberships, groups, users } from "@/lib/schema";
import { isUniqueConstraintError } from "@/lib/utils";
import { inviteUserToGroupSchema } from "./inviteUserToGroupSchema";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function inviteUser(_: any, formData: FormData) {
  "use server";
  const payload = inviteUserToGroupSchema.parse({
    email: formData.get("email"),
    groupId: formData.get("groupId"),
  });
  const session = await getRequiredSession();

  if (session.user == null) {
    throw new Error("Unauthorized");
  }
  const groupId = +payload.groupId;

  const affectedGroup = await db.query.groups.findFirst({
    where: and(eq(groups.id, groupId), eq(groups.userId, session.user.id)),
    columns: {
      id: true,
      userId: true,
    },
  });

  const isGroupAdmin = affectedGroup?.id != null;

  if (!isGroupAdmin) {
    return {
      message:
        "Sie sind kein Admin dieser Gruppe. Sie können keine Benutzer einladen.",
    };
  }

  const invitedUser = await db.query.users.findFirst({
    where: eq(users.email, payload.email.toLocaleLowerCase().trim()),
    columns: {
      id: true,
    },
  });

  if (invitedUser == null) {
    return {
      message: "Dieser Benutzer existiert nicht.",
    };
  }

  if (affectedGroup.userId == invitedUser.id) {
    return {
      message: "Sie können sich nicht selbst einladen.",
    };
  }

  try {
    // TODO: Handle unique constraint violation
    await db.insert(groupMemberships).values({
      groupId: groupId,
      userId: invitedUser.id,
    });
  } catch (e) {
    if (isUniqueConstraintError(e)) {
      return {
        message:
          "Dieser Benutzer wurde bereits eingeladen oder ist schon Mitgled dieser Gruppe.",
      };
    }

    throw e;
  }
  revalidatePath(`/modules/${groupId}`);
}
