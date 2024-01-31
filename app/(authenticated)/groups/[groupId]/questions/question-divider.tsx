import React from "react";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { CheckCheckIcon } from "lucide-react";

interface QuestionDividerProps {
  question: {
    id: number;
    title: string;
    content: string;
    createdBy: string;
    groupId: number;
    createdAt: Date | null;
    hasBestAnswer: boolean;
  };
}

export function QuestionDivider({
  question: {
    id,
    title,
    content,
    createdBy,
    createdAt,
    groupId,
    hasBestAnswer,
  },
}: QuestionDividerProps) {
  const dividerClass = hasBestAnswer ? "bg-green-500/10" : "";
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
      <div className="text-right text-xs  text-muted-foreground">
        Erstellt am{" "}
        {createdAt
          ? createdAt.toLocaleDateString("de-DE")
          : "Unbekanntes Datum"}
      </div>
    </div>
  );
}
