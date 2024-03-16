import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { and, eq, or, arrayContains, exists } from "drizzle-orm";
import { groupMemberships, modules } from "@/lib/schema";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { ActionButton } from "@/components/layout/action-button";
import { CheckIcon, FlagIcon, ClockIcon } from "lucide-react";
import { EditModuleAction } from "@/app/(authenticated)/modules/[moduleId]/edit-module-action";
import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import ModuleTabs from "@/app/(authenticated)/modules/[moduleId]/module-tabs";
import { SetGoalAction } from "./(goals)/set-goal-action";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { CompleteModuleAction } from "./(completeModule)/complete-module-action";
import { format } from "date-fns";
import { TimeModuleAction } from "@/app/(authenticated)/modules/[moduleId]/(spentTime)/time-module-action";
import { findSpentTime } from "@/lib/data/spentTime";

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
  const moduleTime = await findSpentTime({
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
          <TimeModuleAction moduleId={currentModule.id}>
            <ActionButton>
              {/*complete a module*/}
              <ClockIcon />
            </ActionButton>
          </TimeModuleAction>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleUsage?.targetDate && !moduleUsage?.completedDate && (
            <div className=" border-teal-500 border p-4 items-center rounded">
              <h2 className="pb-2 text-2xl font-bold flex gap-4 items-center">
                <FlagIcon />
                Modulziel
              </h2>
              <p>
                Dein Ziel ist es, das Modul bis zum{" "}
                <strong>{format(moduleUsage.targetDate, "dd.MM.yyyy")}</strong>{" "}
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
                  {format(moduleUsage.completedDate, "dd.MM.yyyy")}
                </strong>{" "}
                nach {moduleUsage.attempts} Versuchen mit der Note{" "}
                <strong>
                  {moduleUsage.reachedGrade}{" "}
                  {moduleUsage.passed ? "bestanden" : "nicht bestanden"}
                </strong>
                .
              </p>
            </div>
          )}
          {moduleUsage?.completedDate && (
            <div
              className={`border p-4 rounded items-center ${
                moduleTime?.hoursSpent ? "border-teal-500" : "border-gray-400"
              }`}
            >
              <h2 className="pb-2 text-2xl font-bold flex gap-4 items-center">
                <ClockIcon />
                Zeit für das Modul
              </h2>
              {moduleTime?.hoursSpent ? (
                <p>
                  Du hast <strong>{moduleTime.hoursSpent} Stunden</strong> für
                  dieses Modul aufgewendet.
                </p>
              ) : (
                <p>Zeit noch nicht erfasst.</p>
              )}
            </div>
          )}
        </div>
        <ModuleTabs moduleId={+moduleId} />
        {children}
      </div>
    </DetailLayout>
  );
}
