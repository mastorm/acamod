import { ModuleCard, ModuleCollection } from "@/components/shared/modules";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsages, modules } from "@/lib/schema";
import { desc, eq, and } from "drizzle-orm";

export default async function GroupModules({
  params: { groupId },
}: {
  params: { groupId: string };
}) {
  const session = await getRequiredSession();
  const userModules = await db
    .select()
    .from(modules)
    .where(
      and(
        eq(modules.sharedWithGroup, +groupId),
        eq(moduleUsages.userId, session.user.id)
      )
    )
    .leftJoin(moduleUsages, eq(modules.id, moduleUsages.moduleId))
    .orderBy(
      desc(moduleUsages.completedDate),
      modules.name,
      desc(moduleUsages.targetDate)
    );

  return (
    <ModuleCollection>
      {userModules.map((x) => (
        <ModuleCard
          key={x.modules.id}
          module={x.modules}
          moduleUsage={x.moduleUsages}
        />
      ))}
    </ModuleCollection>
  );
}
