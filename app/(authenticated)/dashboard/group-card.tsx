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
  };
}

export function GroupCard({ group: { id, name } }: GroupCardProps) {
  return (
    <Link href={urls.groupDetails(id)}>
      <Card className="hover:bg-accent">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Hier könnten später interessante Infos zu deiner Gruppe zu finden
            sein. Vorerst dient die Karte nur als link.
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
