CREATE TABLE IF NOT EXISTS "groupMembership" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"groupId" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "groupMembership_userId_groupId_index" ON "groupMembership" ("userId","groupId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupMembership" ADD CONSTRAINT "groupMembership_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupMembership" ADD CONSTRAINT "groupMembership_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
