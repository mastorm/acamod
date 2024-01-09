import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { SetGoalDialog } from "./set-goal-dialog";
import { GoalSchema, goalSchema } from "./goalSchema";
import { format } from "date-fns";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { moduleUsage } from "@/lib/schema";

interface FileUploadActionProps {
  moduleId: number;
}

export async function SetGoalAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  const session = await getRequiredSession();
  const currentGoal = await findModuleUsage({
    moduleId: moduleId,
    userId: session.user.id,
  });

  async function setGoal(payload: GoalSchema) {
    "use server";
    goalSchema.parse(payload);
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
        targetDate: new Date(payload.targetDate!),
        userId: session.user.id,
      });
    } else {
      await db.update(moduleUsage).set({
        targetDate: new Date(payload.targetDate!),
      });
    }

    revalidatePath(`/modules/${moduleId}`);
  }
  return (
    <SetGoalDialog
      onSave={setGoal}
      defaultValues={{
        targetDate: currentGoal?.targetDate
          ? format(currentGoal.targetDate, "yyyy-MM-dd")
          : "",
      }}
    >
      {children}
    </SetGoalDialog>
  );
}
