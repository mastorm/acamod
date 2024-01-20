import { db } from "@/lib/database";
import { Questions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { QuestionCard } from "./question-card";
import { CreateNewQuestionAction } from "../create-new-question-action";

interface QuestionsPageProps {
  params: {
    groupId: string;
  };
}
export default async function QuestionsPage({
  params: { groupId },
}: QuestionsPageProps) {
  const groupQuestions = await db
    .select()
    .from(Questions)
    .where(eq(Questions.groupId, +groupId));
  return (
    <>
      <div className="flex gap-4 pb-6 mt-8">
        <h2 className="text-2xl font-bold">Fragen</h2>
        <CreateNewQuestionAction groupId={groupId} />
      </div>

      <div className="grid gap-8 grid-cols-1  overflow-auto ">
        {groupQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </>
  );
}
