import { put, list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { attachments } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function GET(
  request: Request,
  context: { params: { moduleId: string } }
) {
  const session = await getRequiredSession();
  const params = new URL(request.url).searchParams;
  const fileId = params.get("fileId");

  if (fileId == null) {
    return NextResponse.json(
      { message: "Please provide a fileId!" },
      { status: 400 }
    );
  }

  const file = await db.query.attachments.findFirst({
    where: and(
      eq(attachments.id, fileId),
      eq(attachments.moduleId, +context.params.moduleId)
    ),
  });

  if (file == null) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
