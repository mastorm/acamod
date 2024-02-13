import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Editor } from "@/app/(authenticated)/modules/[moduleId]/notes/editor";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { and, eq } from "drizzle-orm";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { moduleUsages } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const session = await getRequiredSession();
  const usage = await findModuleUsage({
    moduleId: +moduleId,
    userId: session.user.id,
  });

  async function updateNote(moduleId: number, note: string) {
    "use server";
    const session = await getRequiredSession();
    const userId = session.user.id;
    const existing = await findModuleUsage({
      moduleId: +moduleId,
      userId: session.user.id,
    });

    if (existing == null) {
      await db.insert(moduleUsages).values({ note, moduleId, userId: userId });
    } else {
      await db
        .update(moduleUsages)
        .set({ note })
        .where(eq(moduleUsages.moduleId, moduleId));
    }
    revalidatePath(urls.moduleDetails(moduleId, "notes"));
  }

  return (
    <main>
      <Editor
        moduleId={+moduleId}
        initial={usage?.note ?? ""}
        onNoteChange={updateNote}
      />
    </main>
  );
}
