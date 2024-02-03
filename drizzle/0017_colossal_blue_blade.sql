ALTER TABLE "forum_answers" ADD COLUMN "isBestAnswer" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "forum_questions" ADD COLUMN "hasBestAnswer" boolean DEFAULT false;