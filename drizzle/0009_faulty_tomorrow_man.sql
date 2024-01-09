CREATE INDEX IF NOT EXISTS "attachments_moduleId_index" ON "attachments" ("moduleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attachments_userId_index" ON "attachments" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attachments_blobUrl_index" ON "attachments" ("blobUrl");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "goals_userId_moduleId_index" ON "goals" ("userId","moduleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "groups_userId_index" ON "groups" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "notes_userId_moduleId_index" ON "notes" ("userId","moduleId");