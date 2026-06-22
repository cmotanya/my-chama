ALTER TYPE "public"."member_role" ADD VALUE 'admin' BEFORE 'owner';--> statement-breakpoint
ALTER TABLE "chamas" DROP CONSTRAINT "chamas_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "chamas" ADD COLUMN "invite_token" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "chamas" ADD CONSTRAINT "chamas_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chamas" ADD CONSTRAINT "chamas_invite_token_unique" UNIQUE("invite_token");