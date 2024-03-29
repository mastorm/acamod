import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { modules } from "./modules";

export const attachments = pgTable(
  "attachments",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    uploaderId: text("userId")
      .notNull()
      .references(() => users.id),
    moduleId: integer("moduleId")
      .references(() => modules.id)
      .notNull(),
    filename: text("filename").notNull(),
    mimeType: text("mimeType"),
    size: integer("size").notNull(),
    blobUrl: text("blobUrl").notNull(),
    uploadedAt: timestamp("uploadedAt").notNull(),
  },
  (t) => ({
    idxModule: index().on(t.moduleId),
    idxUploader: index().on(t.uploaderId),
    idxBlobUrl: index().on(t.blobUrl),
  })
);
