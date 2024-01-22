ALTER TABLE "moduleUsages" ADD COLUMN "completionPoints" integer;--> statement-breakpoint
ALTER TABLE "moduleUsages" ADD COLUMN "attempts" integer;--> statement-breakpoint
ALTER TABLE "moduleUsages" ADD COLUMN "passed" boolean;