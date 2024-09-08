import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL || "bad";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url,
  },
});
