import { attachments } from "@/lib/schema";
import { FileUpIcon } from "lucide-react";
import { Attachment } from "./attachment";
interface AttachmentsProps {
  moduleId: number;
  attachments: (typeof attachments.$inferSelect)[];
}

function NoFiles() {
  return (
    <div className="grid justify-items-center gap-4 ">
      <FileUpIcon className="w-12 h-12" />
      <span className="max-w-sm text-center">
        Zu diesem Modul wurden noch keine Dateien hochgeladen. Um eine Datei
        hochzuladen, zieh Sie bitte einfach per drag & drop in dieses Feld.
      </span>
    </div>
  );
}

export function Attachments({ moduleId, attachments }: AttachmentsProps) {
  return (
    <div className="border rounded p-8">
      {attachments.length == 0 && <NoFiles />}
      <div className="divide-y">
        {attachments.map((x) => (
          <Attachment key={x.id} attachment={x} />
        ))}
      </div>
    </div>
  );
}
