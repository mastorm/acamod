"use server";

import { isGroupOwner } from "@/lib/data/groups";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { groupMemberships, groups } from "@/lib/schema";
import { urls } from "@/lib/urls";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeFromGroup(fd: FormData) {
  const session = await getRequiredSession();
  const groupId = +(fd.get("groupId") as unknown as string);
  const userId = fd.get("userId") as unknown as string;

  if (!(await isGroupOwner(groupId, session.user.id))) {
    throw new Error("You can only remove members from groups you own");
  }

  await db
    .delete(groupMemberships)
    .where(
      and(
        eq(groupMemberships.groupId, groupId),
        eq(groupMemberships.userId, userId)
      )
    );

  revalidatePath(urls.groupDetails(groupId, "members"));
}
