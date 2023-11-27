import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urls } from "@/lib/urls";

interface ModuleCardProps {
  module: {
    id: number;
    name: string;
  };
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
