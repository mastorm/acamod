import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsages, modules, users } from "@/lib/schema";
import { and, avg, eq } from "drizzle-orm";
import { GamificationCard } from "./gamification-card";
import { GradesLeaderboardChart } from "./grades-leaderboard-chart";
interface GamificationOutletProps {
  groupId: number;
}

export async function GradesLeaderboard({ groupId }: GamificationOutletProps) {
  const session = await getRequiredSession();
  const results = await db
    .select({
      name: users.name,
      avgGrade: avg(moduleUsages.reachedGrade),
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
    .orderBy(avg(moduleUsages.reachedGrade));
  return (
    <GamificationCard name="Leaderboard: Noten">
      <GradesLeaderboardChart
        data={results.map((x) => ({
          avgGrade: Number(x.avgGrade),
          name: x.name ?? "",
        }))}
      />
    </GamificationCard>
  );
}
