import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { goals } from "@/lib/schema";
import { SetGoalDialog } from "./set-goal-dialog";
import { GoalSchema, goalSchema } from "./goalSchema";
import { getExistingGoal } from "@/lib/data/goals";
import { format } from "date-fns";

interface FileUploadActionProps {
  moduleId: number;
}

export async function SetGoalAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  const currentGoal = await getExistingGoal(moduleId);

  async function uploadFiles(payload: GoalSchema) {
    "use server";
    goalSchema.parse(payload);
    const session = await getRequiredSession();

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    const currentGoal = await getExistingGoal(moduleId);
    if (currentGoal == null) {
      await db.insert(goals).values({
        moduleId: moduleId,
        targetDate: new Date(payload.targetDate!),
        userId: session.user.id,
      });
    } else {
      await db.update(goals).set({
        targetDate: new Date(payload.targetDate!),
      });
    }

    revalidatePath(`/modules/${moduleId}`);
  }
  return (
    <SetGoalDialog
      onSave={uploadFiles}
      defaultValues={{
        targetDate: currentGoal
          ? format(currentGoal.targetDate, "yyyy-MM-dd")
          : "",
      }}
    >
      {children}
    </SetGoalDialog>
  );
}
