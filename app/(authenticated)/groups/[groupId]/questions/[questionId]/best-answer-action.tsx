import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { BestAnswerDialog } from "./best-answer-dialog";
import { Questions, Answers } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { IsBestAnswerSchema, isBestAnswerSchema } from "./bestAnswerSchema";
import { urls } from "@/lib/urls";

interface BestAnswerActionProps {
  questionId: number;
  answerId: number;
}

export async function BestAnswerAction({
  children,
  questionId,
  answerId,
}: PropsWithChildren<BestAnswerActionProps>) {
  const session = await getRequiredSession();

  async function markAsBestAnswer(values: IsBestAnswerSchema) {
    "use server";
    const session = await getRequiredSession();
    isBestAnswerSchema.parse(values);

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    // Abrufen der Frage
    const question = await db.query.Questions.findFirst({
      where: eq(Questions.id, questionId),
      columns: { createdBy: true },
    });

    // Überprüfen, ob der aktuelle Benutzer der Ersteller der Frage ist
    if (question?.createdBy !== session.user.id) {
      throw new Error(
        "Nur der Ersteller der Frage kann die beste Antwort wählen.",
      );
    }

    await db
      .update(Answers)
      .set({ isBestAnswer: false })
      .where(eq(Answers.questionId, questionId))
      .execute();

    // Markieren der ausgewählten Antwort als beste Antwort
    await db
      .update(Answers)
      .set({ isBestAnswer: true })
      .where(eq(Answers.id, answerId))
      .execute();

    revalidatePath(`/questions/${questionId}`);
  }
  return (
    <BestAnswerDialog
      defaultValues={{
        isBestAnswer: false,
      }}
      onSave={markAsBestAnswer}
    >
      {children}
    </BestAnswerDialog>
  );
}
