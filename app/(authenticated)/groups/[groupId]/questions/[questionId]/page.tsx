import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { eq, and, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Questions } from "@/lib/schema/questions";
import { Answers } from "@/lib/schema";
import React from "react";
import { CreateNewAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/create-new-answer-action";
import { AnswerCard } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/answer-card";
import { hasAccessToGroup } from "@/lib/data/groups";

interface QuestionDetailsPageProps {
  params: {
    questionId: string;
  };
}

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

  const questionAnswers = await db
    .select()
    .from(Answers)
    .where(eq(Answers.questionId, +questionId));

  return (
    <main>
      <div className="flex gap-4 pb-6 mt-8">
        <h1 className="text-2xl font-bold break-words">
          {currentQuestion.title}
        </h1>
        <h3 className="text-2xl font-bold break-words">
          {currentQuestion.content}
        </h3>
        <CreateNewAnswerAction questionId={questionId} />
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {questionAnswers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </main>
  );
}
