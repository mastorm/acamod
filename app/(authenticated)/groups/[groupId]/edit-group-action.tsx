import {
  GroupSchema,
  groupSchema,
} from "@/app/(authenticated)/_shared/groupSchema";
import { GroupFormDialog } from "@/app/(authenticated)/_shared/group-form-dialog";
import { ActionButton } from "@/components/layout/action-button";
import { SettingsIcon } from "lucide-react";
import { db } from "@/lib/database";
import { groups } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
import { and, eq } from "drizzle-orm";
import { getRequiredSession } from "@/lib/getSession";

interface EditGroupActionProps {
  groupId: number;
  group: GroupSchema;
  editGamification: boolean;
}

export function EditGroupAction({
  group,
  groupId,
  editGamification,
}: EditGroupActionProps) {
  async function updateGroup(updatedGroup: GroupSchema) {
    "use server";

    groupSchema.parse(updatedGroup);

    const session = await getRequiredSession();

    await db
      .update(groups)
      .set({
        name: updatedGroup.name,
        enableBestGradesGamification: updatedGroup.enableBestGradesGamification,
        enableCreditGamification: updatedGroup.enableCreditGamification,
        enableTimeSpentGamification: updatedGroup.enableTimeSpentGamification,
      })
      .where(and(eq(groups.id, groupId), eq(groups.userId, session.user.id)));

    revalidatePath(urls.groupDetails(groupId));
  }

  return (
    <GroupFormDialog
      texts={{
        description: "Bitte bearbeiten Sie die Gruppe:",
        title: "Gruppe bearbeiten",
        saveButton: "Bearbeiten",
        toast: {
          title: "Erfolgreich bearbeitet!",
          description: "Die Gruppe wurde erfolgreich bearbeitet",
        },
      }}
      defaultValues={group}
      onSave={updateGroup}
      editGamification={editGamification}
    >
      <ActionButton>
        <SettingsIcon />
      </ActionButton>
    </GroupFormDialog>
  );
}
