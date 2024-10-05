import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

if (!process.env.DB_URL) {
  throw new Error("Missing environment variable: DATABASE_PATH");
}

export const db = drizzle(new Database(process.env.DB_URL));
