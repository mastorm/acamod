import { db } from "@/lib/database";
import {
  Answers,
  Questions,
  users,
  groupMemberships,
  groups,
} from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { CreateNewQuestionAction } from "../create-new-question-action";
import { QuestionDivider } from "@/app/(authenticated)/groups/[groupId]/questions/question-divider";
import { getRequiredSession } from "@/lib/getSession";
import { hasAccessToGroup } from "@/lib/data/groups";

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
  creatorName: string | null;
  creatorImage: string | null;
}

export default async function QuestionsPage({
  params: { groupId },
}: QuestionsPageProps) {
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
  const groupQuestions = await db
    .select({
      id: Questions.id,
      title: Questions.title,
      content: Questions.content,
      createdBy: Questions.createdBy,
      groupId: Questions.groupId,
      createdAt: Questions.createdAt,
      hasBestAnswer: Questions.hasBestAnswer,
      creatorName: users.name,
      creatorImage: users.image,
    })
    .from(Questions)
    .leftJoin(users, eq(Questions.createdBy, users.id))
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
