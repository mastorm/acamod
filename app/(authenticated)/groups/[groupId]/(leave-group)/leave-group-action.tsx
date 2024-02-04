import { Button } from "@/components/ui/button";
import { isGroupOwner } from "@/lib/data/groups";
import { getRequiredSession } from "@/lib/getSession";
import { DoorOpenIcon } from "lucide-react";
import { LeaveGroupDialog } from "./leave-group-dialog";

interface LeaveGroupActionProps {
  groupId: number;
}

export async function LeaveGroupAction({ groupId }: LeaveGroupActionProps) {
  const session = await getRequiredSession();
  const isOwner = await isGroupOwner(groupId, session.user.id);

  if (isOwner) {
    return null;
  }

  return (
    <LeaveGroupDialog groupId={groupId}>
      <Button variant="ghost">
        <DoorOpenIcon />
      </Button>
    </LeaveGroupDialog>
  );
}
