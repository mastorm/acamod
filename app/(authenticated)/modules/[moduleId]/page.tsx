import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { Button } from "@/components/ui/button";
import { CheckIcon, FlagIcon, SettingsIcon } from "lucide-react";
import { PropsWithChildren } from "react";

interface ModuleDetailsPageProps {
  params: {
    moduleId: string;
  };
}

function ActionButton({ children }: PropsWithChildren) {
  return <Button variant="ghost">{children}</Button>;
}
export default async function ModuleDetailsPage({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const session = await getRequiredSession();
  const currentModule = await db.query.modules.findFirst({
    columns: {
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
            {/*Complete module*/}
            <CheckIcon />
          </ActionButton>
          <ActionButton>
            {/*Set a deadline*/}
            <FlagIcon />
          </ActionButton>
          <ActionButton>
            {/*Edit module settings*/}
            <SettingsIcon />
          </ActionButton>
        </>
      }
    >
      asd
    </DetailLayout>
  );
}
