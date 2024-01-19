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

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
    content: string;
    createdBy: string;
    groupId: number;
    createdAt: Date | null;
  };
}

export function QuestionCard({
  question: { id, title, content, createdBy, createdAt },
}: QuestionCardProps) {
  return (
    <Link href={urls.questionsDetails(id)}>
      <Card className="hover:bg-accent">
        <CardHeader>
          <CardTitle>
            <div className="break-words">{title}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div className="break-words">{content}</div>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <CardDate
              dateString={createdAt ? createdAt.toISOString() : undefined}
            />
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
