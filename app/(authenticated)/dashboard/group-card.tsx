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
  };
}

export function GroupCard({
  group: { id, name, outstandingInvite },
}: GroupCardProps) {
  return (
    <Link href={urls.groupDetails(id)}>
      <Card className="hover:bg-accent">
        <CardHeader className="flex gap-2">
          {outstandingInvite && (
            <div className="bg-teal-500 rounded-2xl px-2 py-0.5 self-start">
              Einladung
            </div>
          )}

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
