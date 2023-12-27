import { attachments } from "@/lib/schema";
import { FileIcon } from "lucide-react";

interface AttachmentProps {
  attachment: typeof attachments.$inferSelect;
}

export function Attachment({ attachment }: AttachmentProps) {
  return (
    <a
      href={attachment.blobUrl}
      className="p-2 flex gap-2 hover:bg-primary-foreground"
    >
      <div className="flex flex-1 gap-2">
        <FileIcon />
        {attachment.filename}
      </div>
      <div className="flex-end font-thin">
        hochgeladen am {attachment.uploadedAt.toLocaleDateString()}
      </div>
    </a>
  );
}
