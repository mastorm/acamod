import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";

export const Questions = pgTable("forum_questions", {
  id: serial("id").primaryKey(),
  groupId: integer("groupId")
    .references(() => groups.id)
    .notNull(),
  createdBy: text("createdBy")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  hasBestAnswer: boolean("hasBestAnswer").default(false),
});
