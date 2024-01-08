CREATE TABLE IF NOT EXISTS "moduleUsage" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"moduleId" integer NOT NULL,
	"completedDate" timestamp,
	"note" text,
	"targetDate" timestamp
);
--> statement-breakpoint
DROP TABLE "goals";--> statement-breakpoint
DROP TABLE "notes";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "moduleUsage_userId_moduleId_index" ON "moduleUsage" ("userId","moduleId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moduleUsage" ADD CONSTRAINT "moduleUsage_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moduleUsage" ADD CONSTRAINT "moduleUsage_moduleId_modules_id_fk" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
