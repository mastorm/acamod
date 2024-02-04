"use server";

import { isGroupOwner } from "@/lib/data/groups";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { groupMemberships, groups } from "@/lib/schema";
import { urls } from "@/lib/urls";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function leaveGroup(fd: FormData) {
  const session = await getRequiredSession();
  const groupId = +(fd.get("groupId") as unknown as string);

  if (await isGroupOwner(groupId, session.user.id)) {
    throw new Error("You can't leave a group you own");
  }

  await db
    .delete(groupMemberships)
    .where(
      and(
        eq(groupMemberships.groupId, groupId),
        eq(groupMemberships.userId, session.user.id)
      )
    );

  redirect(urls.dashboard());
}
