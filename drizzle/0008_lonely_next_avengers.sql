ALTER TABLE "chamas" DROP CONSTRAINT "chamas_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "chamas" ADD COLUMN "owner_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "chamas" ADD CONSTRAINT "chamas_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chamas" DROP COLUMN "ownerId";