import React from "react";
import { BestAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/best-answer-action";
import { CheckIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";

interface AnswerDividerProps {
  answer: {
    id: number;
    questionId: number;
    postedBy: string;
    content: string;
    isBestAnswer: boolean | null;
    updatedAt: Date | null;
    createdAt: Date | null;
  };
}

export function AnswerDivider({
  answer: { id, content, postedBy, createdAt, questionId, isBestAnswer },
}: AnswerDividerProps) {
  const answerClass = isBestAnswer ? "bg-green-500/10" : "";
  const iconClass = isBestAnswer ? "text-green-500 hover:bg-green-500/20" : "";
  return (
    <div className={`border-b border-gray-400 p-4 ${answerClass}`}>
      <div className="flex items-center">
        <div className="flex-grow my-2  text-muted-foreground break-words ">
          {content}
        </div>
        <div className="flex-initial ml-4">
          <BestAnswerAction questionId={questionId} answerId={id}>
            <ActionButton>
              <CheckIcon className={iconClass} />
            </ActionButton>
          </BestAnswerAction>
        </div>
      </div>
      <div className="text-right text-xs  text-muted-foreground ">
        Beantwortet am{" "}
        {createdAt
          ? createdAt.toLocaleDateString("de-DE")
          : "Unbekanntes Datum"}
      </div>
    </div>
  );
}
