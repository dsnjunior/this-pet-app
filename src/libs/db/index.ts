import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.database_url!;
const client = postgres(connectionString);

export const db = drizzle(client, {
  schema,
});

export { schema };
