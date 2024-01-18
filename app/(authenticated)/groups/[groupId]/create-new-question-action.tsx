import React from "react";
import { Button } from "@/components/ui/button";
import { QuestionFormDialog } from "@/app/(authenticated)/groups/[groupId]/question-form-dialog";
import { db } from "@/lib/database";
import { Questions } from "@/lib/schema/questions";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
import { PlusCircle } from "lucide-react";
import {
  QuestionSchema,
  questionSchema,
} from "@/app/(authenticated)/groups/[groupId]/questionSchema";

interface CreateNewQuestionActionProps {
  groupId: string;
}
export function CreateNewQuestionAction({
  groupId,
}: CreateNewQuestionActionProps) {
  async function createQuestion(questionData: QuestionSchema) {
    "use server";
    const payload = questionSchema.parse(questionData);

    const session = await getSession();
    if (!session) {
      throw new Error("unauthorized!");
    }

    const result = await db
      .insert(Questions)
      .values({
        groupId,
        createdBy: session.user.id,
        title: payload.title,
        content: payload.content,
      })
      .returning({ id: Questions.id });

    revalidatePath(`/groups/${groupId}/questions`);
  }

  return (
    <QuestionFormDialog
      onSave={createQuestion}
      texts={{
        description: "Bitte geben Sie die Details für die neue Frage ein:",
        title: "Neue Frage erstellen",
        saveButton: "Frage stellen",
        toast: {
          title: "Frage erfolgreich erstellt!",
          description: "Die Frage wurde erfolgreich angelegt",
        },
      }}
    >
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Neue Frage stellen
      </Button>
    </QuestionFormDialog>
  );
}
