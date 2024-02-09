import { PropsWithChildren } from "react";
import { getRequiredSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import { TimeSpentDialog } from "./time-module-dialog";
import { format, parseISO } from "date-fns";
import { moduleUsages, modules } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { TimeSpentSchemaType, timeSpentSchema } from "./time-module-schema";
import { findSpentTime } from "@/lib/data/spentTime";

interface FileUploadActionProps {
  moduleId: number;
}

export async function TimeModuleAction({
  children,
  moduleId,
}: PropsWithChildren<FileUploadActionProps>) {
  const session = await getRequiredSession();

  async function spentTimeModule(values: TimeSpentSchemaType) {
    "use server";
    const session = await getRequiredSession();
    timeSpentSchema.parse(values);

    if (session.user == null) {
      throw new Error("Unauthorized");
    }

    const spentTime = await findSpentTime({
      moduleId: +moduleId,
      userId: session.user.id,
    });
    if (spentTime == null) {
      await db.insert(moduleUsages).values({
        moduleId: moduleId,
        userId: session.user.id,
        hoursSpent: values.hoursSpent,
      });
    } else {
      await db
        .update(moduleUsages)
        .set({
          hoursSpent: values.hoursSpent,
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
    <TimeSpentDialog
      defaultValues={{
        hoursSpent: 0,
      }}
      onSave={spentTimeModule}
    >
      {children}
    </TimeSpentDialog>
  );
}
