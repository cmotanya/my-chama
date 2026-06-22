CREATE TYPE "public"."contribution_frequency" AS ENUM('weekly', 'monthly');--> statement-breakpoint
CREATE TYPE "public"."group-type" AS ENUM('table-banking', 'merry-go-round', 'lending');--> statement-breakpoint
CREATE TYPE "public"."member_role" AS ENUM('owner', 'member');--> statement-breakpoint
CREATE TYPE "public"."member_status" AS ENUM('active', 'pending', 'past');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('member', 'admin', 'owner');--> statement-breakpoint
CREATE TABLE "chamas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "chamas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"member_count" integer DEFAULT 0 NOT NULL,
	"contribution_amount" integer DEFAULT 0 NOT NULL,
	"contribution_frequency" "contribution_frequency" DEFAULT 'monthly' NOT NULL,
	"owner_id" integer NOT NULL,
	"invite_token" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "chamas_invite_token_unique" UNIQUE("invite_token")
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"chama_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"role" "member_role" DEFAULT 'member' NOT NULL,
	"status" "member_status" DEFAULT 'pending' NOT NULL,
	"total_contributed" integer DEFAULT 0 NOT NULL,
	"loan_balance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "chama_id" integer;--> statement-breakpoint
ALTER TABLE "chamas" ADD CONSTRAINT "chamas_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_chama_id_chamas_id_fk" FOREIGN KEY ("chama_id") REFERENCES "public"."chamas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email";