import { cache } from "react";
import { getRequiredSession } from "../getSession";
import { db } from "../database";
import { and, eq } from "drizzle-orm";
import { moduleUsage } from "../schema";

type ModuleUsageParams = { moduleId: number; userId: string };

export const findModuleUsage = cache(async function (
  params: ModuleUsageParams
) {
  return db.query.moduleUsage.findFirst({
    where: and(
      eq(moduleUsage.userId, moduleUsage.userId),
      eq(moduleUsage.moduleId, params.moduleId)
    ),
    columns: {
      note: true,
      completedDate: true,
      targetDate: true,
    },
  });
});
