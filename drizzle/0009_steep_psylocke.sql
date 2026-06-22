CREATE TYPE "public"."group_type" AS ENUM('merry_go_round', 'lending');--> statement-breakpoint
ALTER TABLE "chamas" ADD COLUMN "group_type" "group_type" NOT NULL;--> statement-breakpoint
DROP TYPE "public"."group-type";