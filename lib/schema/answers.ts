import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { Questions } from "./questions";
import { users } from "./users";

export const Answers = pgTable("forum_answers", {
  id: serial("id").primaryKey(),
  questionId: integer("questionId")
    .references(() => Questions.id)
    .notNull(),
  postedBy: text("postedBy")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  isBestAnswer: boolean("isBestAnswer").default(false),
});
