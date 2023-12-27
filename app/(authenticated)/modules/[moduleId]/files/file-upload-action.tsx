import { PropsWithChildren } from "react";
import { FileUploadDialog } from "./file-upload-dialog";
import { FileUploadSchema, fileUploadSchema } from "./fileUploadSchema";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { attachments } from "@/lib/schema";
import { put } from "@vercel/blob";

interface FileUploadActionProps {
  moduleId: number;
}

export function FileUploadAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  async function uploadFiles(payload: FormData) {
    "use server";

    const session = await getRequiredSession();

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    const files = payload.getAll("files") as File[];

    const attachmentValues: (typeof attachments.$inferInsert)[] = [];

    for (const file of files) {
      const blob = await put(getAttachmentPath(moduleId, file.name), file, {
        access: "public",
      });
      attachmentValues.push({
        filename: file.name,
        uploaderId: session.user.id,
        moduleId: moduleId,
        mimeType: file.type,
        uploadedAt: new Date(),
        blobUrl: blob.url,
        size: file.size,
      });
    }
    await db.insert(attachments).values(attachmentValues);
    revalidatePath(`/modules/${moduleId}/files`);
  }
  return <FileUploadDialog onSave={uploadFiles}>{children}</FileUploadDialog>;
}
function getAttachmentPath(moduleId: number, name: string): string {
  return `modules/${moduleId}/${name}`;
}
