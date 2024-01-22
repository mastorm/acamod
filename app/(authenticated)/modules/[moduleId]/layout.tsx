import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { and, eq, or, arrayContains, exists } from "drizzle-orm";
import { groupMemberships, modules } from "@/lib/schema";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { ActionButton } from "@/components/layout/action-button";
import { CheckIcon, FlagIcon } from "lucide-react";
import { EditModuleAction } from "@/app/(authenticated)/modules/[moduleId]/edit-module-action";
import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import ModuleTabs from "@/app/(authenticated)/modules/[moduleId]/module-tabs";
import { SetGoalAction } from "./(goals)/set-goal-action";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { CompleteModuleAction } from "./(completeModule)/complete-module-action";

export default async function ModuleDetailLayout({
  children,
  params: { moduleId },
}: PropsWithChildren<ModuleDetailsPageProps>) {
  const session = await getRequiredSession();

  const possibleModules = await db
    .select()
    .from(modules)
    .where(
      and(
        or(
          eq(modules.userId, session.user.id),
          exists(
            db
              .select({ groupId: groupMemberships.groupId })
              .from(groupMemberships)
              .where(
                and(
                  eq(groupMemberships.userId, session.user.id),
                  eq(groupMemberships.groupId, modules.sharedWithGroup)
                )
              )
          )
        ),
        eq(modules.id, +moduleId)
      )
    )
    .limit(1);

  const currentModule = possibleModules[0];

  const moduleUsage = await findModuleUsage({
    moduleId: +moduleId,
    userId: session.user.id,
  });

  if (currentModule == null) {
    return notFound();
  }
  return (
    <DetailLayout
      title={currentModule.name}
      subtitle={
        currentModule.credits ? `${currentModule.credits} Credits` : undefined
      }
      actions={
        <>
          <CompleteModuleAction moduleId={currentModule.id}>
            <ActionButton>
              {/*complete a module*/}
              <CheckIcon />
            </ActionButton>
          </CompleteModuleAction>

          <SetGoalAction moduleId={currentModule.id}>
            <ActionButton>
              {/*Set a deadline*/}
              <FlagIcon />
            </ActionButton>
          </SetGoalAction>

          <EditModuleAction
            moduleId={currentModule.id}
            module={{
              name: currentModule.name,
              shortCode: currentModule.shortCode ?? "",
              credits: currentModule.credits ?? 0,
              sharedWithGroup:
                currentModule.sharedWithGroup?.toString() ?? "none",
            }}
          />
        </>
      }
    >
      <div className="grid gap-4">
        <div className="flex max-w-96">
          {moduleUsage?.targetDate && !moduleUsage?.completedDate && (
            <div className=" border-teal-500 border p-4 items-center rounded">
              <h2 className="pb-2 text-2xl font-bold flex gap-4 items-center">
                <FlagIcon />
                Modulziel
              </h2>
              <p>
                Dein Ziel ist es, das Modul bis zum{" "}
                <strong>{moduleUsage.targetDate.toLocaleDateString()}</strong>{" "}
                abzuschließen.
              </p>
            </div>
          )}
          {moduleUsage?.completedDate && (
            <div className=" border-teal-500 border p-4 items-center rounded">
              <h2 className="pb-2 text-2xl font-bold flex gap-4 items-center">
                <FlagIcon />
                Modul abgeschlossen
              </h2>
              <p>
                Du hast dieses Modul am{" "}
                <strong>
                  {moduleUsage.completedDate.toLocaleDateString()}
                </strong>{" "}
                nach {moduleUsage.attempts} Versuchen mit{" "}
                {moduleUsage.completionPoints} Punkten{" "}
                {moduleUsage.passed ? "bestanden" : "nicht bestanden"}.
              </p>
            </div>
          )}
        </div>
        <ModuleTabs moduleId={+moduleId} />
        {children}
      </div>
    </DetailLayout>
  );
}
