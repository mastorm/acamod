ALTER TABLE "groupMembership" RENAME TO "groupMemberships";--> statement-breakpoint
ALTER TABLE "moduleUsage" RENAME TO "moduleUsages";--> statement-breakpoint
ALTER TABLE "groupMemberships" DROP CONSTRAINT "groupMembership_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "groupMemberships" DROP CONSTRAINT "groupMembership_groupId_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "moduleUsages" DROP CONSTRAINT "moduleUsage_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "moduleUsages" DROP CONSTRAINT "moduleUsage_moduleId_modules_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "groupMembership_userId_groupId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "moduleUsage_userId_moduleId_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "groupMemberships_userId_groupId_index" ON "groupMemberships" ("userId","groupId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "moduleUsages_userId_moduleId_index" ON "moduleUsages" ("userId","moduleId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupMemberships" ADD CONSTRAINT "groupMemberships_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupMemberships" ADD CONSTRAINT "groupMemberships_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moduleUsages" ADD CONSTRAINT "moduleUsages_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moduleUsages" ADD CONSTRAINT "moduleUsages_moduleId_modules_id_fk" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
