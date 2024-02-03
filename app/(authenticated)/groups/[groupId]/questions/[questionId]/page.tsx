import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Questions } from "@/lib/schema/questions";
import { Answers } from "@/lib/schema";
import React from "react";
import { CreateNewAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/create-new-answer-action";
import { AnswerCard } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/answer-card";
import { hasAccessToGroup } from "@/lib/data/groups";
import { CheckCheckIcon } from "lucide-react";
import { AnswerDivider } from "./answer-divider";

interface QuestionDetailsPageProps {
  params: {
    questionId: string;
  };
}
interface Answer {
  id: number;
  questionId: number;
  postedBy: string;
  content: string;
  isBestAnswer: boolean | null;
  updatedAt: Date | null;
  createdAt: Date | null;
}

const sortAnswers = (answers: Answer[]) => {
  return answers.sort((a, b) => {
    if (a.isBestAnswer === true) return -1;
    if (b.isBestAnswer === true) return 1;
    return 0;
  });
};

async function questionDetailsPageData(questionId: string) {
  const session = await getRequiredSession();
  db.select()
    .from(Questions)
    .where(
      and(
        eq(Questions.id, +questionId),
        hasAccessToGroup(Questions.groupId, session.user.id)
      )
    )
    .leftJoin(Answers, eq(Questions.id, Answers.questionId));
}

export default async function QuestionDetailsPage({
  params: { questionId },
}: QuestionDetailsPageProps) {
  const currentQuestion = await db.query.Questions.findFirst({
    columns: {
      id: true,
      title: true,
      content: true,
    },
    where: eq(Questions.id, +questionId),
  });

  if (currentQuestion == null) {
    return notFound();
  }

  let questionAnswers = await db
    .select()
    .from(Answers)
    .where(eq(Answers.questionId, +questionId));

  questionAnswers = sortAnswers(questionAnswers);

  // Überprüfen, ob es eine beste Antwort gibt
  const hasBestAnswer = questionAnswers.some((answer) => answer.isBestAnswer);

  return (
    <main>
      <div className="pb-4 mt-8 border-b border-gray-400 p-4 ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold break-words mr-2">
            {currentQuestion.title}
          </h1>
          {hasBestAnswer && <CheckCheckIcon className="text-green-500 ml-2" />}{" "}
        </div>
        <h3 className="text-xl break-words ">{currentQuestion.content}</h3>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {questionAnswers.map((answer) => (
          <div key={answer.id}>
            <AnswerDivider
              answer={{ ...answer, isBestAnswer: answer.isBestAnswer ?? false }}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <CreateNewAnswerAction questionId={questionId} />
      </div>
    </main>
  );
}
