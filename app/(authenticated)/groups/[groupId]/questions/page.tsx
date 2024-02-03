import { db } from "@/lib/database";
import { Answers, Questions } from "@/lib/schema";
import { eq } from "drizzle-orm";

import { CreateNewQuestionAction } from "../create-new-question-action";
import { QuestionDivider } from "@/app/(authenticated)/groups/[groupId]/questions/question-divider";

interface QuestionsPageProps {
  params: {
    groupId: string;
  };
}
interface Answer {
  isBestAnswer: boolean | null;
}

interface Question {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  groupId: number;
  createdAt: Date | null;
  hasBestAnswer: boolean;
}

export default async function QuestionsPage({
  params: { groupId },
}: QuestionsPageProps) {
  const groupQuestions = await db
    .select()
    .from(Questions)
    .where(eq(Questions.groupId, +groupId));

  const questionsWithBestAnswers: Question[] = await Promise.all(
    groupQuestions.map(async (question) => {
      const answers = await db
        .select()
        .from(Answers)
        .where(eq(Answers.questionId, question.id));
      const hasBestAnswer = answers.some(
        (answer) => answer.isBestAnswer || false,
      );
      return { ...question, hasBestAnswer };
    }),
  );

  return (
    <>
      <div className="flex gap-4 pb-6 mt-8">
        <h2 className="text-2xl font-bold">Fragen</h2>
        <CreateNewQuestionAction groupId={groupId} />
      </div>

      <div className="grid gap-8 grid-cols-1  overflow-auto  mb-8">
        {questionsWithBestAnswers.map((question) => (
          <QuestionDivider key={question.id} question={question} />
        ))}
      </div>
    </>
  );
}
