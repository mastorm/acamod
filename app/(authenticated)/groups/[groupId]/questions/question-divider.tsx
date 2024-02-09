import React from "react";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { CheckCheckIcon } from "lucide-react";
import UserAvatar from "@/components/layout/user-avatar";

interface QuestionDividerProps {
  question: {
    id: number;
    title: string;
    content: string;
    createdBy: string;
    groupId: number;
    createdAt: Date | null;
    hasBestAnswer: boolean | null;
    creatorName: string | null;
    creatorImage: string | null;
  };
}

export async function QuestionDivider({
  question: {
    id,
    title,
    content,
    createdBy,
    createdAt,
    groupId,
    hasBestAnswer,
    creatorName,
    creatorImage,
  },
}: QuestionDividerProps) {
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
    <div className="border-b border-gray-400 p-4">
      <Link
        href={urls.questionsDetails(groupId, id)}
        className="flex items-center text-2xl font-semibold leading-none tracking-tight hover:underline"
      >
        {title}
        {hasBestAnswer && (
          <CheckCheckIcon className="text-green-500 ml-2" />
        )}{" "}
      </Link>
      <div className=" my-2 text-muted-foreground break-words">{content}</div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <div className="text-xs text-muted-foreground">
            erstellt am {formattedDate}
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
