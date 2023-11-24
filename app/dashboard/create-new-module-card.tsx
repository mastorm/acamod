import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderPlus } from "lucide-react";
import { CreateNewModuleDialog } from "./create-new-module-dialog";
import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createModuleSchema } from "./createModuleSchema";
import { getSession } from "@/lib/getSession";

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
    <Card>
      <CardHeader>
        <CardTitle>Neues Modul</CardTitle>
      </CardHeader>

      <CardContent>
        <CreateNewModuleDialog onSave={createModule}>
          <button className="p-8 hover:bg-secondary/90 w-full border rounded grid place-items-center">
            <FolderPlus />
            Neues Modul erstellen
          </button>
        </CreateNewModuleDialog>
      </CardContent>
    </Card>
  );
}
