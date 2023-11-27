import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { getRequiredSession } from "@/lib/getSession";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface ModuleDetailsPageProps {
  params: {
    moduleId: string;
  };
}

export default async function ModuleDetailsPage({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  const session = await getRequiredSession();
  const currentModule = await db.query.modules.findFirst({
    columns: {
      name: true,
    },
    where: and(eq(modules.userId, session.user.id), eq(modules.id, +moduleId)),
  });

  if (currentModule == null) {
    return notFound();
  }
  return <div>{currentModule.name}</div>;
}
