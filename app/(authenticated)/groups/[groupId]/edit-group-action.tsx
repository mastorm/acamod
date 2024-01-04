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
}

export function EditGroupAction({ group, groupId }: EditGroupActionProps) {
  async function updateGroup(updatedGroup: GroupSchema) {
    "use server";

    groupSchema.parse(updatedGroup);

    const session = await getRequiredSession();

    await db
      .update(groups)
      .set({
        name: updatedGroup.name,
        // Weitere Felder hier...
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
    >
      <ActionButton>
        <SettingsIcon />
      </ActionButton>
    </GroupFormDialog>
  );
}