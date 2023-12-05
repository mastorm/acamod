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
import { createGroupSchema } from "./createGroupSchema";
import { useToast } from "@/components/ui/use-toast";

interface CreateNewGroupDialogProps {
  onSave: (groupName: string) => Promise<void>;
}

export function CreateNewGroupDialog({
  children,
  onSave,
}: PropsWithChildren<CreateNewGroupDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createGroupSchema>) {
    setBusy(true);
    await onSave(values.groupName);

    toast({
      title: "Erfolgreich erstellt!",
      description: "Die Gruppe wurde erfolgreich angelegt",
    });
    setBusy(false);
    //TODO: Navigate to created group when a detail page exists
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Neue Gruppe erstellen</DialogHeader>
        <DialogDescription>
          Bitte geben Sie den Namen der neuen Gruppe ein:
        </DialogDescription>
        <Form {...form}>
          <form id="createGroupForm" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gruppenbezeichnung</FormLabel>
                  <FormControl>
                    <Input placeholder="Gruppe A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createGroupForm">
            Erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
