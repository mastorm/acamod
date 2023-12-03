import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { CheckIcon, FlagIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import { EditModuleAction } from "@/app/(authenticated)/modules/[moduleId]/edit-module-action";

interface ModuleDetailsPageProps {
  params: {
    moduleId: string;
  };
}

export default async function ModuleDetailsPage({
  params: { moduleId },
}: ModuleDetailsPageProps) {
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
      asd
    </DetailLayout>
  );
}
