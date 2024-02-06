import { boolean, index, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const groups = pgTable(
  "groups",
  {
    id: serial("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    name: text("name").notNull(),
    enableCreditGamification: boolean("enableCreditGamification")
      .notNull()
      .default(false),
    enableTimeSpentGamification: boolean("enableTimeSpentGamification")
      .notNull()
      .default(false),
    enableBestGradesGamification: boolean("enableBestGradesGamification")
      .notNull()
      .default(false),
  },
  (t) => ({
    idxUser: index().on(t.userId),
  })
);
