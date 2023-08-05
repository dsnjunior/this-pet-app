import type { Config } from "drizzle-kit";

export default {
  schema: "./src/libs/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.database_url!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
