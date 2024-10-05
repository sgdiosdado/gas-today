import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  verbose: true,
  strict: true,
});
