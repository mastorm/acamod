"use server";

import { db } from "@/lib/database";
import { getSession } from "@/lib/getSession";
import { modules } from "@/lib/schema";

async function createModule(moduleName: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("unauthorized!");
  }
  await db
    .insert(modules)
    .values({ name: moduleName, userId: session.user.id });
}
