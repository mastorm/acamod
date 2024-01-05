import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { goals } from "@/lib/schema";

interface ModuleCardProps {
  module: {
    id: number;
    name: string;
  };
  goals: Pick<typeof goals.$inferSelect, "targetDate"> | null;
}

export function ModuleCard({ module: { id, name } }: ModuleCardProps) {
  return (
    <Link href={urls.moduleDetails(id)}>
      <Card className="hover:bg-accent">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Hier könnten später interessante Statistiken oder Infos zu Modulen
            zu finden sein. Vorerst dient die Karte nur als link.
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
