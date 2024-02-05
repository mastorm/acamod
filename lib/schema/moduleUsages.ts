import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  decimal,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { modules } from "./modules";

export const moduleUsages = pgTable(
  "moduleUsages",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    moduleId: integer("moduleId")
      .references(() => modules.id)
      .notNull(),
    completedDate: timestamp("completedDate"),
    reachedGrade: decimal("reachedGrade", { precision: 3, scale: 1 }),
    attempts: integer("attempts"),
    passed: boolean("passed"),
    note: text("note"),
    targetDate: timestamp("targetDate"),
  },
  (t) => ({
    userModule: uniqueIndex().on(t.userId, t.moduleId),
    userId: index().on(t.userId),
  })
);
