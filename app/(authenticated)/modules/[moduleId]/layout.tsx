import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { and, eq } from "drizzle-orm";
import { modules } from "@/lib/schema";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { ActionButton } from "@/components/layout/action-button";
import { CheckIcon, FlagIcon } from "lucide-react";
import { EditModuleAction } from "@/app/(authenticated)/modules/[moduleId]/edit-module-action";
import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import ModuleTabs from "@/app/(authenticated)/modules/[moduleId]/module-tabs";
import { SetGoalAction } from "./(goals)/set-goal-action";
import { getExistingGoal } from "@/lib/data/goals";

export default async function ModuleDetailLayout({
  children,
  params: { moduleId },
}: PropsWithChildren<ModuleDetailsPageProps>) {
  const session = await getRequiredSession();
  const currentModule = await db.query.modules.findFirst({
    columns: {
      id: true,
      shortCode: true,
      credits: true,
      name: true,
    },
    where: and(eq(modules.userId, session.user.id), eq(modules.id, +moduleId)),
  });

  const currentGoal = await getExistingGoal(+moduleId);

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
          <ActionButton>
            {/*complete a module*/}
            <CheckIcon />
          </ActionButton>
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
            }}
          />
        </>
      }
    >
      <div className="flex flex-col gap-4 items-baseline">
        {currentGoal && (
          <div className=" border-teal-500 border p-4 items-center rounded">
            <h2 className="pb-2 text-2xl font-bold flex gap-4 items-center">
              <FlagIcon />
              Modulziel
            </h2>
            <p>
              Dein Ziel ist es, das Modul bis zum{" "}
              <strong>{currentGoal.targetDate.toLocaleDateString()}</strong>{" "}
              abzuschließen.
            </p>
          </div>
        )}
        <ModuleTabs moduleId={+moduleId} />
      </div>
      {children}
    </DetailLayout>
  );
}
