"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";

interface CompleteModuleDialogProps {
  onSave: () => Promise<void>;
}

export function CompleteModuleDialog({
  children,
  onSave,
}: PropsWithChildren<CompleteModuleDialogProps>) {
  const { toast } = useToast();
  const form = useForm<{}>({
    defaultValues: {},
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: {}) {
    setBusy(true);
    try {
      await onSave();

      toast({
        title: "Modul abgeschlossen!",
        description: "Dein Modul wurde erfolgreich gesetzt!",
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
        <DialogHeader>Modul abschließen</DialogHeader>
        <DialogDescription>
          Hast du ein Modul bestanden? Dann kannst du es hier abschließen.
        </DialogDescription>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="form">
            Modul abschließen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
