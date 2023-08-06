ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "avatar" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" text;