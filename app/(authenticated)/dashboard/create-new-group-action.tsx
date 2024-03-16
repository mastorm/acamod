import React from "react";
import { Button } from "@/components/ui/button";
import { GroupFormDialog } from "@/app/(authenticated)/_shared/group-form-dialog";
import { db } from "@/lib/database";
import { groups } from "@/lib/schema/groups";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import {
  GroupSchema,
  groupSchema,
} from "@/app/(authenticated)/_shared/groupSchema";

export function CreateNewGroupAction() {
  async function createGroup(groupData: GroupSchema) {
    "use server";
    const payload = groupSchema.parse(groupData);

    const session = await getSession();
    if (!session) {
      throw new Error("unauthorized!");
    }

    const result = await db
      .insert(groups)
      .values({ name: payload.name, userId: session.user.id })
      .returning({ id: groups.id });

    revalidatePath("/dashboard");
    redirect(urls.groupDetails(result[0].id));
  }

  return (
    <GroupFormDialog
      onSave={createGroup}
      defaultValues={{
        name: "",
        enableBestGradesGamification: false,
        enableCreditGamification: false,
        enableTimeSpentGamification: false,
      }}
      texts={{
        description: "Bitte geben Sie die Details für die neue Gruppe ein:",
        title: "Neue Gruppe erstellen",
        saveButton: "Erstellen",
        toast: {
          title: "Erfolgreich erstellt!",
          description: "Die Gruppe wurde erfolgreich angelegt",
        },
      }}
      editGamification={false}
    >
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Neue Gruppe erstellen
      </Button>
    </GroupFormDialog>
  );
}
