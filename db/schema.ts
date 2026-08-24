import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitorStats = sqliteTable("visitor_stats", {
  id: integer("id").primaryKey(),
  total: integer("total").notNull().default(0),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
