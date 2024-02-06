ALTER TABLE "groups" ADD COLUMN "enableCreditGamification" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "enableTimeSpentGamification" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "enableBestGradesGamification" boolean DEFAULT false NOT NULL;