import { db } from "@/lib/database";
import { CreateNewModuleAction } from "./create-new-module-action";
import { getRequiredSession } from "@/lib/getSession";
import { moduleUsage, modules } from "@/lib/schema";
import { groups } from "@/lib/schema/groups";
import { eq } from "drizzle-orm";
import { ModuleCard } from "@/app/(authenticated)/dashboard/module-card";
import { GroupCard } from "./group-card";
import { CreateNewGroupAction } from "@/app/(authenticated)/dashboard/create-new-group-action";

export default async function Page() {
  const session = await getRequiredSession();
  const userModules = await db
    .select()
    .from(modules)
    .where(eq(modules.userId, session?.user.id))
    .leftJoin(moduleUsage, eq(modules.id, moduleUsage.moduleId));

  const userGroups = await db
    .select()
    .from(groups)
    .where(eq(groups.userId, session?.user.id));

  return (
    <main>
      <div className="flex gap-4 pb-6 ">
        <h1 className="text-2xl font-bold">Module</h1>
        <CreateNewModuleAction />
      </div>
      {/* TODO: Show list of modules here*/}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {userModules.map((x) => (
          <ModuleCard
            key={x.modules.id}
            module={x.modules}
            moduleUsage={x.moduleUsage}
          />
        ))}
      </div>

      <div className="flex gap-4 pb-6 mt-8">
        <h2 className="text-2xl font-bold">Gruppen</h2>
        <CreateNewGroupAction />
      </div>
      {/* TODO: Show list of groups here*/}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {userGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
}
