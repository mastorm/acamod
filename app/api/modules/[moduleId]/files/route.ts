import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getRequiredSession } from "@/lib/getSession";
import { db } from "@/lib/database";
import { attachments } from "@/lib/schema";

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

  const [{ id }] = await db
    .insert(attachments)
    .values({
      filename: filename,
      uploaderId: session.user.id,
      moduleId: +context.params.moduleId,
      mimeType: file.type,
      uploadedAt: new Date(),
      size: file.size,
    })
    .returning({ id: attachments.id });

  const blob = await put(id, file, {
    access: "public",
  });

  return NextResponse.json(blob);
}
