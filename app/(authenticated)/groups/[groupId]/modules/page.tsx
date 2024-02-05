import { ModuleCard, ModuleCollection } from "@/components/shared/modules";
import { hasAccessToGroup } from "@/lib/data/groups";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsages, modules } from "@/lib/schema";
import { and, desc, eq } from "drizzle-orm";

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
        hasAccessToGroup(+groupId, session.user.id)
      )
    )
    .leftJoin(
      moduleUsages,
      and(
        eq(modules.id, moduleUsages.moduleId),
        eq(moduleUsages.userId, session.user.id)
      )
    )
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
