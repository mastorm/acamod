import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { moduleUsages } from "@/lib/schema";

interface ModuleCardProps {
  module: {
    id: number;
    name: string;
  };
  moduleUsage: Pick<typeof moduleUsages.$inferSelect, "targetDate"> | null;
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
