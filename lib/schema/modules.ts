import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from ".";

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
});
