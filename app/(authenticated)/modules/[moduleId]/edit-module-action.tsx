import {
  moduleSchema,
  ModuleSchema,
} from "@/app/(authenticated)/_shared/moduleSchema";
import { ModuleFormDialog } from "@/app/(authenticated)/_shared/module-form-dialog";
import { ActionButton } from "@/components/layout/action-button";
import { SettingsIcon } from "lucide-react";
import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
import { and, eq } from "drizzle-orm";
import { getRequiredSession } from "@/lib/getSession";
import { getGroupsOfUser } from "@/lib/data/groups";

interface EditModuleActionProps {
  moduleId: number;
  module: ModuleSchema;
}

export async function EditModuleAction({
  module,
  moduleId,
}: EditModuleActionProps) {
  async function updateModule(updatedModule: ModuleSchema) {
    "use server";

    // ensure frontend validation hasnt been tinkered with
    moduleSchema.parse(updatedModule);

    const session = await getRequiredSession();

    await db
      .update(modules)
      .set({
        name: updatedModule.name,
        shortCode:
          updatedModule.shortCode == "" ? null : updatedModule.shortCode,
        credits: updatedModule.credits == 0 ? null : updatedModule.credits,
        sharedWithGroup:
          updatedModule.sharedWithGroup == "none"
            ? null
            : +updatedModule.sharedWithGroup,
      })
      .where(
        and(eq(modules.id, moduleId), eq(modules.userId, session.user.id))
      );

    revalidatePath(urls.moduleDetails(moduleId));
  }
  const session = await getRequiredSession();
  const groups = await getGroupsOfUser(session.user.id);

  return (
    <ModuleFormDialog
      groups={groups}
      texts={{
        description: "Bitte bearbeiten Sie das Modul:",
        title: "Modul bearbeiten",
        saveButton: "Bearbeiten",
        toast: {
          title: "Erfolgreich bearbeitet!",
          description: "Das Modul wurde erfolgreich bearbeitet",
        },
      }}
      defaultValues={module}
      onSave={updateModule}
    >
      <ActionButton>
        <SettingsIcon />
      </ActionButton>
    </ModuleFormDialog>
  );
}
