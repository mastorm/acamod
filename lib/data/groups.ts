import { eq } from "drizzle-orm";
import { db } from "../database";
import { groupMemberships, users } from "../schema";

export async function getGroupMembers({ groupId }: { groupId: number }) {
  return db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      email: users.email,
    })
    .from(groupMemberships)
    .leftJoin(users, eq(groupMemberships.userId, users.id))
    .where(eq(groupMemberships.id, groupId));
}
