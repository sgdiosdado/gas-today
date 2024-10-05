import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const stations = sqliteTable("stations", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
