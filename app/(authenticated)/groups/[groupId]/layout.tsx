import { ActionButton } from "@/components/layout/action-button";
import { DetailLayout } from "@/components/layout/detail-layout";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { groups } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { EditGroupAction } from "./edit-group-action";
import { ModuleTabs } from "../module-tabs";

interface GroupLayoutProps {
  params: {
    groupId: string;
  };
}

export default async function GroupLayout({
  children,
  params: { groupId },
}: PropsWithChildren<GroupLayoutProps>) {
  const session = await getRequiredSession();
  const currentGroup = await db.query.groups.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: and(eq(groups.id, +groupId), eq(groups.userId, session.user.id)),
  });

  if (currentGroup == null) {
    return notFound();
  }
  return (
    <DetailLayout
      title={currentGroup.name}
      subtitle=""
      // Untertitel oder andere relevante Informationen können hier hinzugefügt werden
      actions={
        <EditGroupAction
          groupId={currentGroup.id}
          group={{
            name: currentGroup.name,
          }}
        />
      }
    >
      <div className="grid gap-2">
        <ModuleTabs groupId={+currentGroup.id} />
        {children}
      </div>
    </DetailLayout>
  );
}
