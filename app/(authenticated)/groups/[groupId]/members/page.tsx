import { getGroupMembers } from "@/lib/data/groups";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserAvatar from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";
import { InviteToGroupDialog } from "./(invites)/invite-to-group-dialog";
import { MailIcon } from "lucide-react";
import { RemoveFromGroupAction } from "../(remove-from-group)/leave-group-action";
import { getRequiredSession } from "@/lib/getSession";

export default async function GroupMembersPage({
  params: { groupId },
}: {
  params: { groupId: string };
}) {
  const members = await getGroupMembers({ groupId: +groupId });
  const owner = members.find((m) => m.isOwner);
  const me = await getRequiredSession();

  const currentUserIsOwner = owner?.id === me.user.id;
  console.log(me.user.id);
  return (
    <div className="flex flex-col gap-4">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead>Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((mem) => (
            <TableRow key={mem.id}>
              <TableCell className="font-medium">
                <UserAvatar imageUrl={mem.image} handle={mem.name} />
              </TableCell>
              <TableCell>{mem.name}</TableCell>
              <TableCell>{mem.email}</TableCell>
              <TableCell>
                {mem.isOwner
                  ? "Besitzer"
                  : mem.hasAcceptedInvitation
                    ? "Mitglied"
                    : "Eingeladen"}
              </TableCell>
              <TableCell>
                {currentUserIsOwner && mem.id && mem.id != me.user.id && (
                  <RemoveFromGroupAction groupId={+groupId} userId={mem.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InviteToGroupDialog
        defaultValues={{
          email: "",
          groupId: groupId,
        }}
      >
        <Button variant={"outline"} className="place-self-end self-end">
          <MailIcon className="mr-2" />
          Benutzer einladen
        </Button>
      </InviteToGroupDialog>
    </div>
  );
}
