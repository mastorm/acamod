import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";

interface GamificationCardProps {
  name: string;
}

export function GamificationCard({
  name,
  children,
}: PropsWithChildren<GamificationCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="h-48">{children}</CardContent>
    </Card>
  );
}
