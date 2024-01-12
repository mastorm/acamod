import { pgTable, serial, text, smallint } from "drizzle-orm/pg-core";
import { users } from "./users";

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  credits: smallint("credits"),
  shortCode: text("shortCode"),
});
