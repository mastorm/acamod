import { attachments } from "@/lib/schema";
import { FileIcon, FileX2 } from "lucide-react";
import { db } from "@/lib/database";
import { and, eq } from "drizzle-orm";
import { del } from "@vercel/blob";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
interface AttachmentProps {
  attachment: typeof attachments.$inferSelect;
}

export async function Attachment({ attachment }: AttachmentProps) {
  const me = await getRequiredSession().then((session) => session.user);
  async function deleteAttachment() {
    "use server";

    const session = await getRequiredSession();

    const attachmentToDelete = await db.query.attachments.findFirst({
      where: and(
        eq(attachments.id, attachment.id),

        // for safety reasons, files can only be deleted by their respective uploader
        eq(attachments.uploaderId, session.user.id)
      ),
    });

    if (!attachmentToDelete) {
      throw new Error("Attachment not found");
    }

    await del(attachmentToDelete.blobUrl);
    await db
      .delete(attachments)
      .where(eq(attachments.id, attachmentToDelete.id));
    revalidatePath(urls.moduleDetails(attachmentToDelete.moduleId, "files"));
  }

  const attachmentBelongsToMe = me.id === attachment.uploaderId;
  return (
    <div className="flex items-center">
      <a
        href={attachment.blobUrl}
        className="p-2 flex flex-1 gap-2 hover:bg-primary-foreground"
      >
        <div className="flex flex-1 gap-2">
          <FileIcon />
          {attachment.filename}
        </div>
        <div className="flex-end font-thin">
          hochgeladen am {attachment.uploadedAt.toLocaleDateString()}
        </div>
      </a>

      {attachmentBelongsToMe && (
        <form action={deleteAttachment}>
          <button>
            <FileX2 />
          </button>
        </form>
      )}
    </div>
  );
}
