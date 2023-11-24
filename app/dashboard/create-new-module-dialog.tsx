"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createModuleSchema } from "./createModuleSchema";
import { useToast } from "@/components/ui/use-toast";

interface CreateNewModuleDialogProps {
  onSave: (moduleName: string) => Promise<void>;
}

export function CreateNewModuleDialog({
  children,
  onSave,
}: PropsWithChildren<CreateNewModuleDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createModuleSchema>>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      moduleName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createModuleSchema>) {
    setBusy(true);
    await onSave(values.moduleName);

    toast({
      title: "Erfolgreich erstellt!",
      description: "Das Modul wurde erfolgreich angelegt",
    });
    setBusy(false);
    //TODO: Navigate to created module when a detail page exists
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Neues Modul erstellen</DialogHeader>
        <DialogDescription>
          Bitte geben Sie den Namen des neuen Moduls ein:
        </DialogDescription>
        <Form {...form}>
          <form id="createModuleForm" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="moduleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modulbezeichnung</FormLabel>
                  <FormControl>
                    <Input placeholder="Mathematik I" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createModuleForm">
            Erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
