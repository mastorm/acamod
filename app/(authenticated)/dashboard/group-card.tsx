import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { urls } from "@/lib/urls";

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    outstandingInvite: boolean;
    questionsCount: number;
    membersCount: number;
    answeredQuestionsCount: number;
  };
}

export function GroupCard({
  group: {
    id,
    name,
    outstandingInvite,
    questionsCount,
    membersCount,
    answeredQuestionsCount,
  },
}: GroupCardProps) {
  return (
    <Link href={urls.groupDetails(id)}>
      <Card className="hover:bg-accent">
        <CardHeader className="flex gap-2">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Fragen: {questionsCount}</CardDescription>
          <CardDescription>
            Beantwortete Fragen: {answeredQuestionsCount}
          </CardDescription>
          <CardDescription>Mitglieder: {membersCount}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
