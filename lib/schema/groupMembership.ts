import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { groups } from ".";

// export const groupMembership = pgTable(
//   "groupMembership",
//   {
//     id: serial("id").primaryKey(),
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id),
//     groupId: integer("groupId")
//       .references(() => groups.id)
//       .notNull(),
//   },
//   (t) => ({ userGroupMembership: uniqueIndex().on(t.userId, t.groupId) })
// );
