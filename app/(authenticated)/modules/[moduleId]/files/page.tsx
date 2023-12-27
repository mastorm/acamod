import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Attachments } from "./attachments";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { attachments } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const moduleAttachments = await db.query.attachments.findMany({
    where: eq(attachments.moduleId, +moduleId),
  });

  return (
    <main className="pt-2">
      <div className="flex justify-between">
        <h1 className="text-2xl pb-4">Dateien</h1>
        <Button variant="outline">
          <UploadCloudIcon className="mr-2" /> Datei hochladen
        </Button>
      </div>

      <Attachments moduleId={+moduleId} attachments={moduleAttachments} />
    </main>
  );
}
