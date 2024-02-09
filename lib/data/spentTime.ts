import { cache } from "react";
import { db } from "../database";
import { and, eq } from "drizzle-orm";
import { moduleUsages } from "../schema";

type ModuleUsageParams = { moduleId: number; userId: string };

export const findSpentTime = cache(async function (params: ModuleUsageParams) {
  return db.query.moduleUsages.findFirst({
    where: and(
      eq(moduleUsages.userId, params.userId),
      eq(moduleUsages.moduleId, params.moduleId),
    ),
    columns: {
      hoursSpent: true,
    },
  });
});
