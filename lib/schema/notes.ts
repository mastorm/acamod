import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { modules } from "./modules";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  moduleId: integer("moduleId")
    .references(() => modules.id)
    .notNull(),
  note: text("note"),
});
