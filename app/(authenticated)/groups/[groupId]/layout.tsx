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
import {
  getGroupById,
  hasAccessToGroup,
  isGroupOwner,
} from "@/lib/data/groups";
import { LeaveGroupAction } from "./(leave-group)/leave-group-action";
import { GamificationOutlet } from "./(gamifications)/gamification-outlet";

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
  const isOwner = await isGroupOwner(+groupId, session.user.id);

  const currentGroup = await getGroupById(+groupId);

  if (currentGroup == null) {
    return notFound();
  }

  return (
    <DetailLayout
      title={currentGroup.name}
      subtitle=""
      // Untertitel oder andere relevante Informationen können hier hinzugefügt werden
      actions={
        <>
          {isOwner ? (
            <EditGroupAction groupId={currentGroup.id} group={currentGroup} />
          ) : (
            <LeaveGroupAction groupId={currentGroup.id} />
          )}
        </>
      }
    >
      <div className="grid gap-6">
        <GamificationOutlet groupId={+groupId} />

        <div className="grid gap-2">
          <ModuleTabs groupId={+currentGroup.id} />
          {children}
        </div>
      </div>
    </DetailLayout>
  );
}
