"use client";
import { SubmitButton } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { leaveGroup } from "./action";
import { DoorOpenIcon } from "lucide-react";

interface LeaveGroupDialogProps {
  groupId: number;
}

export function LeaveGroupDialog({
  children,
  groupId,
}: PropsWithChildren<LeaveGroupDialogProps>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Lerngruppe verlassen</DialogHeader>
        <DialogDescription>
          Sind Sie sich sicher, dass sie die Gruppe verlassen wollen? Sie können
          der Gruppe nicht selbstständig wieder beitreten!
        </DialogDescription>
        <form action={leaveGroup} id="leaveGroupForm">
          <input type="hidden" name="groupId" value={groupId} />
        </form>
        <DialogFooter>
          <SubmitButton form="leaveGroupForm">
            <DoorOpenIcon className="mr-2" />
            Lerngruppe verlassen
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
