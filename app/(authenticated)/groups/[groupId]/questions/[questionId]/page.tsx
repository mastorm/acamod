import { db } from "@/lib/database";
import { getRequiredSession } from "@/lib/getSession";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  Answers,
  users,
  Questions,
  groupMemberships,
  groups,
} from "@/lib/schema";
import React from "react";
import { CreateNewAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/create-new-answer-action";
import { hasAccessToGroup } from "@/lib/data/groups";
import { CheckCheckIcon } from "lucide-react";
import { AnswerDivider } from "./answer-divider";

interface QuestionDetailsPageProps {
  params: {
    questionId: string;
    groupId: string;
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
  creatorName: string | null;
  creatorImage: string | null;
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
        hasAccessToGroup(Questions.groupId, session.user.id),
      ),
    )
    .leftJoin(Answers, eq(Questions.id, Answers.questionId));
}

export default async function QuestionDetailsPage({
  params: { questionId, groupId },
}: QuestionDetailsPageProps) {
  const session = await getRequiredSession();
  const accessCheck = await db
    .select({ userId: groupMemberships.userId })
    .from(groupMemberships)
    .where(
      and(
        eq(groupMemberships.groupId, +groupId),
        eq(groupMemberships.userId, session.user.id),
      ),
    )
    .union(
      db
        .select({ userId: groups.userId })
        .from(groups)
        .where(eq(groups.id, +groupId)),
    )
    .execute();

  // Wenn der Benutzer keinen Zugang hat, leer oder Fehler zurückgeben
  if (accessCheck.length === 0) {
    throw new Error("Kein Zugang zur Gruppe");
  }

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
    .select({
      id: Answers.id,
      questionId: Answers.questionId,
      content: Answers.content,
      postedBy: Answers.postedBy,
      createdAt: Answers.createdAt,
      isBestAnswer: Answers.isBestAnswer,
      updatedAt: Answers.updatedAt,
      creatorName: users.name,
      creatorImage: users.image,
    })
    .from(Answers)
    .leftJoin(users, eq(Answers.postedBy, users.id))
    .where(eq(Answers.questionId, +questionId));

  questionAnswers = sortAnswers(questionAnswers);

  // Überprüfen, ob es eine beste Antwort gibt
  const hasBestAnswer = questionAnswers.some((answer) => answer.isBestAnswer);

  return (
    <main>
      <div className="pb-4 mt-8 border-b border-gray-400 p-4 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold break-words mr-2">
              {currentQuestion.title}
            </h1>
            {hasBestAnswer && <CheckCheckIcon className="text-green-500" />}
          </div>
          {!hasBestAnswer && <CreateNewAnswerAction questionId={questionId} />}
        </div>
        <h3 className="text-xl break-words ">{currentQuestion.content}</h3>
      </div>

      <div className="grid grid-cols-1 overflow-auto mb-8">
        {questionAnswers.map((answer) => (
          <div key={answer.id}>
            <AnswerDivider
              answer={{ ...answer, isBestAnswer: answer.isBestAnswer ?? false }}
            />
          </div>
        ))}
      </div>

      {!hasBestAnswer && (
        <div className="mb-4">
          <CreateNewAnswerAction questionId={questionId} />
        </div>
      )}
    </main>
  );
}
