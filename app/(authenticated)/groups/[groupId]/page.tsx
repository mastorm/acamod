import { db } from "@/lib/database";
import { groups } from "@/lib/schema/groups";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditGroupAction } from "@/app/(authenticated)/groups/[groupId]/edit-group-action";
import { CreateNewQuestionAction } from "@/app/(authenticated)/groups/[groupId]/create-new-question-action";
import { QuestionCard } from "@/app/(authenticated)/groups/[groupId]/question-card";
import { Questions } from "@/lib/schema/questions";

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
    where: and(eq(groups.id, +groupId), eq(groups.userId, session.user.id)),
  });

  if (currentGroup == null) {
    return notFound();
  }

  const groupQuestions = await db
    .select()
    .from(Questions)
    .where(eq(Questions.groupId, groupId));

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

          <EditGroupAction
            groupId={currentGroup.id}
            group={{
              name: currentGroup.name,
              // Weitere Felder, falls vorhanden...
            }}
          />
          {/* Weitere Aktionen für Gruppen */}
        </>
      }
    >
      <Tabs defaultValue="members" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Mitglieder</TabsTrigger>
          <TabsTrigger value="activities">Aktivitäten</TabsTrigger>
          <TabsTrigger value="questions">Fragen</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          Hier folgt eine Mitgliederliste
        </TabsContent>
        <TabsContent value="activities">
          Hier folgen Gruppenaktivitäten
        </TabsContent>
        <TabsContent value="questions">
          <div className="flex gap-4 pb-6 mt-8">
            <h2 className="text-2xl font-bold">Fragen</h2>
            <CreateNewQuestionAction groupId={groupId} />
          </div>
          <div className="grid gap-8 grid-cols-1  overflow-auto ">
            {groupQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DetailLayout>
  );
}
