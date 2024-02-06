import { SQLWrapper, and, eq, exists } from "drizzle-orm";
import { db } from "../database";
import { groupMemberships, groups, users } from "../schema";
import { cache } from "react";
import { getRequiredSession } from "../getSession";

export const getGroupById = cache(async function getGroupById(groupId: number) {
  const session = await getRequiredSession();

  return db.query.groups.findFirst({
    where: and(
      eq(groups.id, +groupId),
      hasAccessToGroup(groups.id, session.user.id)
    ),
  });
});

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

export const getGroupsOfUser = cache(async (userId: string) => {
  const loadOwnedGroups = db
    .select({
      id: groups.id,
      name: groups.name,
    })
    .from(groups)
    .where(eq(groups.userId, userId));

  const groupsByMembership = await db
    .select({
      id: groups.id,
      name: groups.name,
      outstandingInvite: groupMemberships.hasAcceptedInvitation,
    })
    .from(groupMemberships)
    .where(eq(groupMemberships.userId, userId))
    .innerJoin(groups, eq(groupMemberships.groupId, groups.id));

  return [
    ...(await loadOwnedGroups).map((x) => ({ ...x, outstandingInvite: false })),
    ...groupsByMembership.map((x) => {
      x.outstandingInvite = !x.outstandingInvite;
      return x;
    }),
  ].sort((a, b) => a.name.localeCompare(b.name));
});
export function hasAccessToGroup(groupId: number | SQLWrapper, userId: string) {
  return exists(
    db
      .select({ userId: groupMemberships.userId })
      .from(groupMemberships)
      .where(
        and(
          eq(groupMemberships.groupId, groupId),
          eq(groupMemberships.userId, userId)
        )
      )
      .union(
        db
          .select({ userId: groups.userId })
          .from(groups)
          .where(eq(groups.id, groupId))
      )
  );
}

export async function isGroupOwner(groupId: number, userId: string) {
  const group = await db.query.groups.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(groups.id, groupId), eq(groups.userId, userId)),
  });

  return group != null;
}
