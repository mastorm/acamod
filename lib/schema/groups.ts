import { index, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const groups = pgTable(
  "groups",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    name: text("name").notNull(),
  },
  (t) => ({
    idxUser: index().on(t.userId),
  })
);
