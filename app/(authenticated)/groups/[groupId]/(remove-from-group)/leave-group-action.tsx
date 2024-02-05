import { Button } from "@/components/ui/button";
import { isGroupOwner } from "@/lib/data/groups";
import { getRequiredSession } from "@/lib/getSession";
import { DoorOpenIcon, UserRoundXIcon } from "lucide-react";
import { RemoveFromGroupDialog } from "./leave-group-dialog";

interface RemoveFromGroupActionProps {
  groupId: number;
  userId: string;
}

export async function RemoveFromGroupAction({
  groupId,
  userId,
}: RemoveFromGroupActionProps) {
  return (
    <RemoveFromGroupDialog groupId={groupId} userId={userId}>
      <Button variant="ghost">
        <UserRoundXIcon />
      </Button>
    </RemoveFromGroupDialog>
  );
}
