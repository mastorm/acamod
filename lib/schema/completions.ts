import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { modules } from "./modules";
import { table } from "console";

// export const completions = pgTable(
//   "completions",
//   {
//     id: serial("id").primaryKey(),
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id),
//     moduleId: integer("moduleId")
//       .references(() => modules.id)
//       .notNull(),
//     completedDate: timestamp("completedDate").notNull(),
//   },
//   (t) => ({ userModule: uniqueIndex().on(t.userId, t.moduleId) })
// );
