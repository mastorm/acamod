import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Attachments } from "./attachments";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { attachments } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { FileUploadAction } from "./file-upload-action";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const moduleAttachments = await db.query.attachments.findMany({
    where: eq(attachments.moduleId, +moduleId),
  });

  return (
    <main className="flex gap-2 flex-col items-end">
      <div className="w-full">
        <Attachments moduleId={+moduleId} attachments={moduleAttachments} />
      </div>
      <FileUploadAction moduleId={+moduleId}>
        <Button variant="outline">
          <UploadCloudIcon className="mr-2" /> Datei hochladen
        </Button>
      </FileUploadAction>
    </main>
  );
}
