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
import { InviteToGroupDialog } from "./(goals)/invite-to-group-dialog";

export default async function GroupMembersPage({
  params: { groupId },
}: {
  params: { groupId: string };
}) {
  const members = await getGroupMembers({ groupId: +groupId });
  return (
    <div>
      <InviteToGroupDialog
        defaultValues={{
          email: "",
          groupId: groupId,
        }}
      >
        <Button>
          DEMO: Benutzer einladen (wird später quickaction in group layout)
        </Button>
      </InviteToGroupDialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rolle</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
