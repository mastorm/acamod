import { pgTable, serial, text, smallint, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { groups } from ".";

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  credits: smallint("credits"),
  shortCode: text("shortCode"),
  sharedWithGroup: integer("sharedWithGroup").references(() => groups.id),
});
