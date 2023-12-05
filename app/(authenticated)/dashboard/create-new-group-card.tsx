import { PlusCircle } from "lucide-react";
import { CreateNewGroupDialog } from "./create-new-group-dialog";
import { db } from "@/lib/database";
import { groups } from "@/lib/schema/groups";
import { revalidatePath } from "next/cache";
import { createGroupSchema } from "./createGroupSchema";
import { getSession } from "@/lib/getSession";
import { Button } from "@/components/ui/button";
import React from "react";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";

export function CreateNewGroupCard() {
  async function createGroup(groupName: string) {
    "use server";
    const payload = createGroupSchema.parse({ groupName });

    const session = await getSession();

    if (!session) {
      throw new Error("unauthorized!");
    }

    const result = await db
      .insert(groups)
      .values({ name: payload.groupName, userId: session.user.id })
      .returning({ id: groups.id });

    revalidatePath("/dashboard");
    redirect(urls.groupDetails(result[0].id));
  }

  return (
    <CreateNewGroupDialog onSave={createGroup}>
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Neue Gruppe erstellen
      </Button>
    </CreateNewGroupDialog>
  );
}
