CREATE TABLE IF NOT EXISTS "forum_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"questionId" integer NOT NULL,
	"postedBy" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"groupId" integer NOT NULL,
	"createdBy" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_answers" ADD CONSTRAINT "forum_answers_questionId_forum_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "forum_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_answers" ADD CONSTRAINT "forum_answers_postedBy_user_id_fk" FOREIGN KEY ("postedBy") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_questions" ADD CONSTRAINT "forum_questions_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_questions" ADD CONSTRAINT "forum_questions_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
