import { hasAccessToGroup } from "@/lib/data/groups";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsages, modules, users } from "@/lib/schema";
import { and, desc, eq, sum } from "drizzle-orm";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { CreditsLeaderboardChart } from "./credits-leaderboard-chart";
import { GamificationCard } from "./gamification-card";
interface GamificationOutletProps {
  groupId: number;
}

export async function CreditsLeaderboard({ groupId }: GamificationOutletProps) {
  const session = await getRequiredSession();
  const results = await db
    .select({
      name: users.name,
      credits: sum(modules.credits),
    })
    .from(users)
    .leftJoin(moduleUsages, eq(users.id, moduleUsages.userId))
    .leftJoin(
      modules,
      and(
        eq(modules.sharedWithGroup, groupId),
        eq(modules.id, moduleUsages.moduleId)
      )
    )
    .where(eq(moduleUsages.passed, true))
    .groupBy(users.name, users.email)
    .orderBy(desc(sum(modules.credits)));
  return (
    <GamificationCard name="Leaderboard: Credits">
      <CreditsLeaderboardChart
        data={results.map((x) => ({
          credits: Number(x.credits),
          name: x.name ?? "",
        }))}
      />
    </GamificationCard>
  );
}
