import { db } from "@/lib/database";
import { CreateNewModuleAction } from "./create-new-module-action";
import { getRequiredSession } from "@/lib/getSession";
import { modules } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { ModuleCard } from "@/app/(authenticated)/dashboard/module-card";

export default async function Page() {
  const session = await getRequiredSession();
  const userModules = await db
    .select()
    .from(modules)
    .where(eq(modules.userId, session?.user.id));

  return (
    <main>
      <div className="flex gap-4 pb-6 ">
        <h1 className="text-2xl font-bold">Module</h1>

        <CreateNewModuleAction />
      </div>
      {/* TODO: Show list of modules here*/}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {userModules.map((x) => (
          <ModuleCard key={x.id} module={x} />
        ))}
      </div>
    </main>
  );
}
