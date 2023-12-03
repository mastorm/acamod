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

interface EditModuleActionProps {
  moduleId: number;
  module: ModuleSchema;
}

export function EditModuleAction({ module, moduleId }: EditModuleActionProps) {
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
      })
      .where(
        and(eq(modules.id, moduleId), eq(modules.userId, session.user.id)),
      );

    revalidatePath(urls.moduleDetails(moduleId));
  }

  return (
    <ModuleFormDialog
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
        {/*Edit module settings*/}
        <SettingsIcon />
      </ActionButton>
    </ModuleFormDialog>
  );
}
