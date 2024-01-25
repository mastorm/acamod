import { DetailLayout } from "@/components/layout/detail-layout";
import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { groupMemberships, groups } from "@/lib/schema";
import {
  and,
  arrayContained,
  arrayContains,
  eq,
  exists,
  inArray,
  or,
  sql,
} from "drizzle-orm";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { EditGroupAction } from "./edit-group-action";
import { ModuleTabs } from "../module-tabs";
import { array } from "zod";
import { hasAccessToGroup } from "@/lib/data/groups";

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

  const possibleGroups = await db
    .select({ id: groups.id, name: groups.name })
    .from(groups)
    .where(
      and(eq(groups.id, +groupId), hasAccessToGroup(groups.id, session.user.id))
    );

  const currentGroup = possibleGroups[0];
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
