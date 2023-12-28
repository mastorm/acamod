import { and, eq } from "drizzle-orm";
import { getRequiredSession } from "../getSession";
import { goals } from "../schema";
import { db } from "../database";
import { cache } from "react";

export const getExistingGoal = cache(async function getExistingGoal(
  moduleId: number
) {
  const session = await getRequiredSession();
  const currentGoal = await db.query.goals.findFirst({
    where: and(
      eq(goals.userId, session.user.id),
      eq(goals.moduleId, +moduleId)
    ),
  });
  return currentGoal;
});
