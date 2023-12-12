import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  note: text("note"),
});
