import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Editor } from "@/app/(authenticated)/modules/[moduleId]/notes/editor";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { notes } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const session = await getRequiredSession();
  const currentNote = await db.query.notes.findFirst({
    where: and(
      eq(notes.moduleId, +moduleId),
      eq(notes.userId, session.user.id),
    ),
  });

  async function updateNote(moduleId: number, note: string) {
    "use server";
    const session = await getRequiredSession();
    const userId = session.user.id;
    const existing = await db.query.notes.findFirst({
      where: and(eq(notes.moduleId, +moduleId), eq(notes.userId, userId)),
    });

    if (existing == null) {
      await db.insert(notes).values({ note, moduleId, userId: userId });
    } else {
      await db
        .update(notes)
        .set({ note })
        .where(and(eq(notes.moduleId, +moduleId), eq(notes.userId, userId)));
    }
  }

  return (
    <main>
      <Editor
        moduleId={+moduleId}
        initial={currentNote?.note ?? ""}
        onNoteChange={updateNote}
      />
    </main>
  );
}
