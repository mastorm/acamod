"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FileUploadSchema, fileUploadSchema } from "./fileUploadSchema";
import { PropsWithChildren, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploadDialogProps {
  onSave: (payload: FormData) => Promise<void>;
}

export function FileUploadDialog({
  children,
  onSave,
}: PropsWithChildren<FileUploadDialogProps>) {
  const { toast } = useToast();
  const form = useForm<FileUploadSchema>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      files: [],
    },
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: FileUploadSchema) {
    setBusy(true);
    try {
      const fd = new FormData();
      for (let i = 0; i < values.files.length; i++) {
        fd.append("files", values.files[i]);
      }
      await onSave(fd);

      toast({
        title: "Erfolgreich hochgeladen!",
        description: "Ihre Dateien wurden erfolgreich hochgeladen!",
      });
    } finally {
      setBusy(false);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Modulanhang ergänzen</DialogHeader>
        <DialogDescription>
          Hier kannst du Dateien und Anhänge zu Modulen ergänzen
        </DialogDescription>
        <Form {...form}>
          <form id="fileUploadForm" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dateien (*)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      placeholder="Mathematik I"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? [...e.target.files] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="fileUploadForm">
            Hochladen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
