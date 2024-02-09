import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { CompleteModuleDialog } from "./complete-module-dialog";
import { format, parseISO } from "date-fns";
import { findModuleUsage } from "@/lib/data/moduleUsages";
import { moduleUsages, modules } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import {
  CompleteModuleSchemaType,
  completeModuleSchema,
} from "./complete-module-schema";

interface FileUploadActionProps {
  moduleId: number;
}

export async function CompleteModuleAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  const session = await getRequiredSession();

  async function completeModule(values: CompleteModuleSchemaType) {
    "use server";
    const session = await getRequiredSession();
    completeModuleSchema.parse(values);

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    const currentGoal = await findModuleUsage({
      moduleId: +moduleId,
      userId: session.user.id,
    });
    if (currentGoal == null) {
      await db.insert(moduleUsages).values({
        moduleId: moduleId,
        completedDate: parseISO(values.completedDate),
        userId: session.user.id,
        attempts: values.attempts,
        reachedGrade: values.grade.toString(),
        passed: values.passed,
      });
    } else {
      await db
        .update(moduleUsages)
        .set({
          completedDate: parseISO(values.completedDate),
          attempts: values.attempts,
          reachedGrade: values.grade.toString(),
          passed: values.passed,
        })
        .where(
          and(
            eq(moduleUsages.moduleId, moduleId),
            eq(moduleUsages.userId, session.user.id),
          ),
        );
    }

    revalidatePath(`/modules/${moduleId}`);
  }
  return (
    <CompleteModuleDialog
      defaultValues={{
        completedDate: format(new Date(), "yyyy-MM-dd"),
        attempts: 1,
        grade: 0,
        passed: true,
      }}
      onSave={completeModule}
    >
      {children}
    </CompleteModuleDialog>
  );
}
