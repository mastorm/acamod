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
import { CheckCheckIcon, CheckIcon } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: number;
    name: string;
  };
  moduleUsage: Pick<typeof moduleUsages.$inferSelect, "completedDate"> | null;
}

export function ModuleCard({
  module: { id, name },
  moduleUsage,
}: ModuleCardProps) {
  return (
    <Link href={urls.moduleDetails(id)}>
      <Card className="hover:bg-accent bg-green-500/10">
        <CardHeader>
          <div className="flex gap-4">
            <CardTitle>{name}</CardTitle>
            {moduleUsage?.completedDate && (
              <CheckCheckIcon className="text-green-500" />
            )}
          </div>
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
