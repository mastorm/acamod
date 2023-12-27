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
export async function POST(
  request: Request,
  context: { params: { moduleId: string } }
): Promise<NextResponse> {
  const data = await request.formData();
  const filename = data.get("filename");
  const file = data.get("file");

  if (typeof filename !== "string" || !(file instanceof File)) {
    return NextResponse.json(
      { message: "Please provide a filename and a file!" },
      { status: 400 }
    );
  }

  const session = await getRequiredSession();

  if (session.user == null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  revalidatePath(`/modules/${context.params.moduleId}/files`);
  const blob = await put(`/modules/${context.params.moduleId}/`, file, {
    access: "public",
  });

  const [{ id }] = await db
    .insert(attachments)
    .values({
      filename: filename,
      uploaderId: session.user.id,
      moduleId: +context.params.moduleId,
      mimeType: file.type,
      uploadedAt: new Date(),
      blobUrl: blob.url,
      size: file.size,
    })
    .returning({ id: attachments.id });

  return NextResponse.json(blob);
}
