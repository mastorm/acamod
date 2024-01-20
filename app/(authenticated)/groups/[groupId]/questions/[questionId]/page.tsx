import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/layout/detail-layout";
import { PlusCircleIcon, UserIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditGroupAction } from "@/app/(authenticated)/groups/[groupId]/edit-group-action";
import { CreateNewQuestionAction } from "@/app/(authenticated)/groups/[groupId]/create-new-question-action";
import { QuestionCard } from "@/app/(authenticated)/groups/[groupId]/questions/question-card";
import { Questions } from "@/lib/schema/questions";
import { Answers } from "@/lib/schema";
import React from "react";
import { CreateNewModuleAction } from "@/app/(authenticated)/dashboard/create-new-module-action";
import { ModuleCard } from "@/app/(authenticated)/dashboard/module-card";
import { CreateNewGroupAction } from "@/app/(authenticated)/dashboard/create-new-group-action";
import { GroupCard } from "@/app/(authenticated)/dashboard/group-card";
import { CreateNewAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/create-new-answer-action";
import { AnswerCard } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/answer-card";

interface QuestionDetailsPageProps {
  params: {
    questionId: string;
  };
}

export default async function QuestionDetailsPage({
  params: { questionId },
}: QuestionDetailsPageProps) {
  const session = await getRequiredSession();
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
      {/* TODO: Show list of groups here*/}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {questionAnswers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </main>
  );
}
