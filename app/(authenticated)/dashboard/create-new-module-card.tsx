import { PlusCircle } from "lucide-react";
import { CreateNewModuleDialog } from "./create-new-module-dialog";
import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createModuleSchema } from "./createModuleSchema";
import { getSession } from "@/lib/getSession";
import { Button } from "@/components/ui/button";
import React from "react";

export function CreateNewModuleCard() {
  async function createModule(moduleName: string) {
    "use server";
    const payload = createModuleSchema.parse({ moduleName });

    const session = await getSession();

    if (!session) {
      throw new Error("unauthorized!");
    }

    await db
      .insert(modules)
      .values({ name: payload.moduleName, userId: session.user.id });

    revalidatePath("/dashboard");
  }

  return (
    <CreateNewModuleDialog onSave={createModule}>
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Neues Modul erstellen
      </Button>
    </CreateNewModuleDialog>
  );
}
