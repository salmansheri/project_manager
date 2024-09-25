CREATE TABLE IF NOT EXISTS "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"joinCode" text
);
