import { urls } from "@/lib/urls";
import { error } from "console";
import { redirect } from "next/navigation";

interface GroupDetailsPageProps {
  params: {
    groupId: string;
  };
}

export default async function GroupDetailsPage({
  params: { groupId },
}: GroupDetailsPageProps) {
  throw redirect(urls.groupDetails(+groupId, "members"));
}
