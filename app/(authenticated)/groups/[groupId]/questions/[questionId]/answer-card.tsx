import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDate,
} from "@/components/ui/card";
import Link from "next/link";
import { urls } from "@/lib/urls";
import React from "react";

interface AnswerCardProps {
  answer: {
    id: number;
    questionId: string;
    postedBy: string;
    content: string;
    updatedAt: Date | null;
    createdAt: Date | null;
  };
}

export function AnswerCard({
  answer: { id, content, postedBy, createdAt },
}: AnswerCardProps) {
  return (
    //<Link href={urls.questionsDetails(id)}>
    <Card className="hover:bg-accent">
      <CardHeader>
        <CardDescription>
          <div className="break-words">{content}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CardDescription>
          <CardDate
            dateString={createdAt ? createdAt.toISOString() : undefined}
          />
        </CardDescription>
      </CardFooter>
    </Card>
    //</Link>
  );
}
