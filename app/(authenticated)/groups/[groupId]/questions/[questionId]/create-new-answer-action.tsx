import React from "react";
import { Button } from "@/components/ui/button";
import { AnswerFormDialog } from "./answer-form-dialog";
import { db } from "@/lib/database";
import { Answers } from "@/lib/schema/answers";
import { getSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { urls } from "@/lib/urls";
import { PlusCircle } from "lucide-react";
import { AnswerSchema, answerSchema } from "./answerSchema";

interface CreateNewAnswerActionProps {
  questionId: string; // Typdefinition für questionId
}
export function CreateNewAnswerAction({
  questionId,
}: CreateNewAnswerActionProps) {
  async function createAnswer(answerData: AnswerSchema) {
    "use server";
    const payload = answerSchema.parse(answerData);

    const session = await getSession();
    if (!session) {
      throw new Error("unauthorized!");
    }

    const result = await db
      .insert(Answers)
      .values({
        questionId: +questionId,
        postedBy: session.user.id,
        content: payload.content,
      })
      .returning({ id: Answers.id });

    revalidatePath(`/questions/${questionId}/answers`);
  }

  return (
    <AnswerFormDialog
      onSave={createAnswer}
      texts={{
        description: "Bitte geben Sie die Details für die neue Antwort ein:",
        saveButton: "Antworten",
        toast: {
          title: "Antwort erfolgreich erstellt!",
          description: "Die Antwort wurde erfolgreich angelegt",
        },
      }}
    >
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Antworten
      </Button>
    </AnswerFormDialog>
  );
}
