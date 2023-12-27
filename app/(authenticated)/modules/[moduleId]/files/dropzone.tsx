"use client";
import { useDropzone } from "react-dropzone";
import { PropsWithChildren, useState } from "react";
import { revalidatePath } from "next/cache";

interface DropzoneProps {
  moduleId: number;
}

export function Dropzone({
  children,
  moduleId,
}: PropsWithChildren<DropzoneProps>) {
  const [uploading, setUploading] = useState(false);

  async function handleDrop(acceptedFiles: File[]) {
    try {
      const fd = new FormData();
      fd.append("file", acceptedFiles[0]);
      fd.append("filename", acceptedFiles[0].name);

      setUploading(true);
      const result = await fetch(`/api/modules/${moduleId}/files`, {
        method: "POST",
        body: fd,
      });
    } finally {
      setUploading(false);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {uploading}
      {children}
    </div>
  );
}
