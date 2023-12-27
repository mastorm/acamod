import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Attachments } from "./attachments";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { attachments } from "@/lib/schema";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const session = await getRequiredSession();

  const moduleAttachments = await db.query.attachments.findMany({
    where: eq(attachments.moduleId, +moduleId),
  });

  return (
    <main>
      <h1 className="text-2xl pb-4">Dateien</h1>
      <Attachments moduleId={+moduleId} attachments={moduleAttachments} />
    </main>
  );
}
