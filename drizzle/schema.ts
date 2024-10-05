import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const stations = sqliteTable("stations", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  lastPrice: real("lastPrice").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const insertStationSchema = createInsertSchema(stations);
