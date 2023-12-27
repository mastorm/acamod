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

  if (currentModule == null) {
    return notFound();
  }
  return (
    <DetailLayout
      title={currentModule.name}
      subtitle={`${currentModule.credits} credits`}
      actions={
        <>
          <ActionButton>
            {/*complete a module*/}
            <CheckIcon />
          </ActionButton>
          <ActionButton>
            {/*Set a deadline*/}
            <FlagIcon />
          </ActionButton>

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
      <div className="flex pb-2">
        <ModuleTabs moduleId={+moduleId} />
      </div>
      {children}
    </DetailLayout>
  );
}
