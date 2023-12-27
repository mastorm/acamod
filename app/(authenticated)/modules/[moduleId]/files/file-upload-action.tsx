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
    revalidatePath(`/modules/${moduleId}/files`);

    const files = payload.getAll("files") as File[];
    const ids = await db
      .insert(attachments)
      .values(
        files.map((file) => ({
          filename: file.name,
          uploaderId: session.user.id,
          moduleId: moduleId,
          mimeType: file.type,
          uploadedAt: new Date(),
          size: file.size,
        }))
      )
      .returning({ id: attachments.id });

    for (var i = 0; i < ids.length; i++) {
      const file = files[i];
      await put(ids[i].id, file, {
        access: "public",
      });
    }
  }
  return <FileUploadDialog onSave={uploadFiles}>{children}</FileUploadDialog>;
}
