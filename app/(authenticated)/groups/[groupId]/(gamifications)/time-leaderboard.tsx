import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsages, modules, users } from "@/lib/schema";
import { and, avg, desc, eq, sum } from "drizzle-orm";
import { GamificationCard } from "./gamification-card";
import { TimeLeaderboardChart } from "./time-leaderboard-chart";
interface GamificationOutletProps {
  groupId: number;
}

export async function TimeLeaderboard({ groupId }: GamificationOutletProps) {
  const session = await getRequiredSession();
  const results = await db
    .select({
      name: users.name,
      hoursSpent: sum(moduleUsages.hoursSpent),
    })
    .from(users)

    .leftJoin(modules, and(eq(modules.sharedWithGroup, groupId)))
    .leftJoin(
      moduleUsages,
      and(
        eq(users.id, moduleUsages.userId),
        eq(moduleUsages.moduleId, modules.id)
      )
    )
    .where(eq(moduleUsages.passed, true))
    .groupBy(users.name, users.email)
    .orderBy(desc(sum(moduleUsages.reachedGrade)));
  return (
    <GamificationCard name="Leaderboard: Lernzeit">
      <TimeLeaderboardChart
        data={results.map((x) => ({
          hoursSpent: Number(x.hoursSpent),
          name: x.name ?? "",
        }))}
      />
    </GamificationCard>
  );
}
