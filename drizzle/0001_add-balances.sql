CREATE TABLE IF NOT EXISTS "budgetlog_balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budgetlog_balance" ADD CONSTRAINT "budgetlog_balance_user_id_budgetlog_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."budgetlog_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
