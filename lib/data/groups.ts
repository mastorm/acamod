import { eq } from "drizzle-orm";
import { db } from "../database";
import { groupMemberships, groups, users } from "../schema";

export async function getGroupMembers({ groupId }: { groupId: number }) {
  const owner = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      email: users.email,
    })
    .from(groups)
    .where(eq(groups.id, groupId))
    .leftJoin(users, eq(groups.userId, users.id));

  const members = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      email: users.email,
      hasAcceptedInvitation: groupMemberships.hasAcceptedInvitation,
    })
    .from(groupMemberships)
    .leftJoin(users, eq(groupMemberships.userId, users.id))
    .where(eq(groupMemberships.groupId, groupId));

  return [
    { ...owner[0], hasAcceptedInvitation: true, isOwner: true },
    ...members.map((x) => ({ ...x, isOwner: false })),
  ];
}
