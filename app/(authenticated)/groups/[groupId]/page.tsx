import { db } from "@/lib/database";
import { groups } from "@/lib/schema/groups";
import { getRequiredSession } from "@/lib/getSession";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupDetailsPageProps {
  params: {
    groupId: string;
  };
}

export default async function GroupDetailsPage({
  params: { groupId },
}: GroupDetailsPageProps) {
  const session = await getRequiredSession();
  const currentGroup = await db.query.groups.findFirst({
    columns: {
      id: true,
      name: true,
      // Weitere relevante Spalten für Gruppen
    },
    where: eq(groups.id, +groupId),
  });

  if (currentGroup == null) {
    return notFound();
  }

  return (
    <DetailLayout
      title={currentGroup.name}
      subtitle=""
      // Untertitel oder andere relevante Informationen können hier hinzugefügt werden
      actions={
        <>
          <ActionButton>
            {/* Aktion, um Mitglieder hinzuzufügen */}
            <PlusCircleIcon />
          </ActionButton>
          <ActionButton>
            {/* Aktion, um Mitgliederliste anzuzeigen */}
            <UserIcon />
          </ActionButton>
          {/* Weitere Aktionen für Gruppen */}
        </>
      }
    >
      <Tabs defaultValue="members" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Mitglieder</TabsTrigger>
          <TabsTrigger value="activities">Aktivitäten</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          Hier folgt eine Mitgliederliste
        </TabsContent>
        <TabsContent value="activities">
          Hier folgen Gruppenaktivitäten
        </TabsContent>
      </Tabs>
    </DetailLayout>
  );
}
