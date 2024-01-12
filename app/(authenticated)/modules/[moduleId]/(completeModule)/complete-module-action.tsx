import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { CompleteModuleDialog } from "./complete-module-dialog";
import { format } from "date-fns";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { moduleUsage } from "@/lib/schema";

interface FileUploadActionProps {
  moduleId: number;
}

export async function CompleteModuleAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  const session = await getRequiredSession();
  const currentGoal = await findModuleUsage({
    moduleId: moduleId,
    userId: session.user.id,
  });

  async function completeModule() {
    "use server";
    const session = await getRequiredSession();

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    const currentGoal = await findModuleUsage({
      moduleId: +moduleId,
      userId: session.user.id,
    });
    if (currentGoal == null) {
      await db.insert(moduleUsage).values({
        moduleId: moduleId,
        completedDate: new Date(),
        userId: session.user.id,
      });
    } else {
      await db.update(moduleUsage).set({
        completedDate: new Date(),
      });
    }

    revalidatePath(`/modules/${moduleId}`);
  }
  return (
    <CompleteModuleDialog onSave={completeModule}>
      {children}
    </CompleteModuleDialog>
  );
}
