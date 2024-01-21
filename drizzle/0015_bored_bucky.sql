ALTER TABLE "modules" ADD COLUMN "sharedWithGroup" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "modules" ADD CONSTRAINT "modules_sharedWithGroup_groups_id_fk" FOREIGN KEY ("sharedWithGroup") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
