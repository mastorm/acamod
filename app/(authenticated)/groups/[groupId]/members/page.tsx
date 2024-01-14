import { getGroupMembers } from "@/lib/data/groups";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import UserAvatar from "@/components/layout/user-avatar";

export default async function GroupMembersPage({
  params: { groupId },
}: {
  params: { groupId: string };
}) {
  const members = await getGroupMembers({ groupId: +groupId });
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
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
              <TableCell>Mitglied</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
