import React from "react";
import { BestAnswerAction } from "@/app/(authenticated)/groups/[groupId]/questions/[questionId]/best-answer-action";
import { CheckIcon } from "lucide-react";
import { ActionButton } from "@/components/layout/action-button";
import UserAvatar from "@/components/layout/user-avatar";

interface AnswerDividerProps {
  answer: {
    id: number;
    questionId: number;
    postedBy: string;
    content: string;
    isBestAnswer: boolean | null;
    updatedAt: Date | null;
    createdAt: Date | null;
    creatorName: string | null;
    creatorImage: string | null;
    hasBestAnswer: boolean;
  };
}

export function AnswerDivider({
  answer: {
    id,
    content,
    postedBy,
    createdAt,
    questionId,
    isBestAnswer,
    creatorName,
    creatorImage,
    hasBestAnswer,
  },
}: AnswerDividerProps) {
  const answerClass = isBestAnswer ? "bg-green-500/10" : "";
  const iconClass = isBestAnswer ? "text-green-500 hover:bg-green-500/20" : "";
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unbekanntes Datum";
  return (
    <div className={`border-b border-gray-400 p-4 ${answerClass}`}>
      <div className="flex items-center">
        <div className="flex-grow my-2  text-muted-foreground break-words ">
          {content}
        </div>
        <div className="flex-initial ml-4">
          {isBestAnswer ? (
            <CheckIcon className="text-green-500" />
          ) : !hasBestAnswer ? (
            <BestAnswerAction questionId={questionId} answerId={id}>
              <ActionButton>
                <CheckIcon />
              </ActionButton>
            </BestAnswerAction>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          <div className="text-xs text-muted-foreground">
            beantwortet am {formattedDate}
          </div>
          <div className="text-xs text-muted-foreground">von {creatorName}</div>
        </div>
        {creatorImage && (
          <UserAvatar imageUrl={creatorImage} handle={creatorName} />
        )}
      </div>
    </div>
  );
}
