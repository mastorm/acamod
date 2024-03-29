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
import { CheckCheckIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { format } from "date-fns";

interface ModuleCardProps {
  module: {
    id: number;
    name: string;
    shortCode?: string | null;
  };
  moduleUsage: Pick<
    typeof moduleUsages.$inferSelect,
    "completedDate" | "targetDate"
  > | null;
}

const cardStyles = cva("hover:bg-accent ", {
  variants: {
    isCompleted: {
      true: "bg-green-500/10",
      false: "",
    },
  },
});

function moduleStatusText(usage: ModuleCardProps["moduleUsage"]) {
  if (usage?.completedDate) {
    return `Abgeschlossen am ${format(usage.completedDate, "dd.MM.yyyy")}`;
  } else if (usage?.targetDate) {
    return `Ziel: ${format(usage.targetDate, "dd.MM.yyyy")}`;
  }
  return "Noch kein Ziel gesetzt";
}

function moduleTitle(module: ModuleCardProps["module"]) {
  return module.name;
}

export function ModuleCard({ module, moduleUsage }: ModuleCardProps) {
  return (
    <Link href={urls.moduleDetails(module.id)}>
      <Card
        className={cardStyles({
          isCompleted: moduleUsage?.completedDate != null,
        })}
      >
        <CardHeader>
          <div className="flex gap-4">
            <CardTitle>{moduleTitle(module)}</CardTitle>
            {moduleUsage?.completedDate && (
              <CheckCheckIcon className="text-green-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{moduleStatusText(moduleUsage)}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
