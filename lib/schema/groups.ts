import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from ".";

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id), // Annahme, dass jede Gruppe einem Benutzer zugeordnet ist
  name: text("name").notNull(),
});
