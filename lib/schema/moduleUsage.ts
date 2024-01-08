import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { modules } from "./modules";

export const moduleUsage = pgTable(
  "moduleUsage",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    moduleId: integer("moduleId")
      .references(() => modules.id)
      .notNull(),
    completedDate: timestamp("completedDate"),
    note: text("note"),
    targetDate: timestamp("targetDate"),
  },
  (t) => ({ userModule: uniqueIndex().on(t.userId, t.moduleId) })
);
