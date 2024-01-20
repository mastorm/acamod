import { db } from "@/lib/database";
import { groups } from "@/lib/schema/groups";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import { EditGroupAction } from "@/app/(authenticated)/groups/[groupId]/edit-group-action";
import { urls } from "@/lib/urls";

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
