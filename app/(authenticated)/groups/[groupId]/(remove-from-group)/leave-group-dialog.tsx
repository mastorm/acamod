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
import { DoorOpenIcon, UserRoundXIcon } from "lucide-react";
import { removeFromGroup } from "./action";

interface LeaveGroupDialogProps {
  groupId: number;
  userId: string;
}

export function RemoveFromGroupDialog({
  children,
  groupId,
  userId,
}: PropsWithChildren<LeaveGroupDialogProps>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Aus Gruppe entfernen</DialogHeader>
        <DialogDescription>
          Sind Sie sich sicher, dass Sie diesen Benutzer aus der Gruppe
          entfernen wollen?
        </DialogDescription>
        <form action={removeFromGroup} id="leaveGroupForm">
          <input type="hidden" name="groupId" value={groupId} />
          <input type="hidden" name="userId" value={userId} />
        </form>
        <DialogFooter>
          <SubmitButton form="leaveGroupForm">
            <UserRoundXIcon className="mr-2" />
            Benutzer entfernen
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
