import { db } from "@/lib/database";
import { CreateNewModuleAction } from "./create-new-module-action";
import { getRequiredSession } from "@/lib/getSession";
import {
  moduleUsages,
  modules,
  Questions,
  groupMemberships,
} from "@/lib/schema";
import { desc, eq, and } from "drizzle-orm";
import { ModuleCard } from "@/components/shared/modules/module-card";
import { GroupCard } from "./group-card";
import { CreateNewGroupAction } from "@/app/(authenticated)/dashboard/create-new-group-action";
import { getGroupsOfUser } from "@/lib/data/groups";
import { ModuleCollection } from "@/components/shared/modules";

export default async function Page() {
  const session = await getRequiredSession();
  const userModules = await db
    .select()
    .from(modules)
    .where(eq(modules.userId, session.user.id))
    .leftJoin(moduleUsages, eq(modules.id, moduleUsages.moduleId))
    .orderBy(
      desc(moduleUsages.completedDate),
      modules.name,
      desc(moduleUsages.targetDate),
    );

  const groups = await getGroupsOfUser(session.user.id);

  const enhancedGroups = await Promise.all(
    groups.map(async (group) => {
      const questions = await db
        .select()
        .from(Questions)
        .where(eq(Questions.groupId, group.id))
        .execute();
      const questionsCount = questions.length;

      const members = await db
        .select()
        .from(groupMemberships)
        .where(eq(groupMemberships.groupId, group.id))
        .execute();
      const membersCount = members.length + 1;

      const answeredQuestions = await db
        .select()
        .from(Questions)
        .where(
          and(
            eq(Questions.groupId, group.id),
            eq(Questions.hasBestAnswer, true),
          ),
        )
        .execute();
      const answeredQuestionsCount = answeredQuestions.length;
      return {
        ...group,
        questionsCount,
        membersCount,
        answeredQuestionsCount,
      };
    }),
  );

  return (
    <main>
      <div className="flex gap-4 pb-6 ">
        <h1 className="text-2xl font-bold">Module</h1>
        <CreateNewModuleAction />
      </div>
      {/* TODO: Show list of modules here*/}
      <ModuleCollection>
        {userModules.map((x) => (
          <ModuleCard
            key={x.modules.id}
            module={x.modules}
            moduleUsage={x.moduleUsages}
          />
        ))}
      </ModuleCollection>

      <div className="flex gap-4 pb-6 mt-8">
        <h2 className="text-2xl font-bold">Gruppen</h2>
        <CreateNewGroupAction />
      </div>
      {/* TODO: Show list of groups here*/}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {enhancedGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
}
