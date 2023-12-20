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
import { useToast } from "@/components/ui/use-toast";
import {
  GroupSchema,
  groupSchema,
} from "@/app/(authenticated)/_shared/groupSchema";

interface GroupFormDialogProps {
  onSave: (payload: GroupSchema) => Promise<void>;
  defaultValues: GroupSchema;
  texts: {
    title: string;
    description: string;
    saveButton: string;
    toast: {
      title: string;
      description: string;
    };
  };
}

export function GroupFormDialog({
  children,
  onSave,
  defaultValues,
  texts,
}: PropsWithChildren<GroupFormDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<GroupSchema>({
    resolver: zodResolver(groupSchema),
    defaultValues,
  });

  async function onSubmit(values: GroupSchema) {
    setBusy(true);
    await onSave(values);

    toast({
      title: texts.toast.title,
      description: texts.toast.description,
    });
    setBusy(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{texts.title}</DialogHeader>
        <DialogDescription>{texts.description}</DialogDescription>
        <Form {...form}>
          <form id="createGroupForm" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gruppenbezeichnung (*)</FormLabel>
                  <FormControl>
                    <Input placeholder="Gruppenname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createGroupForm">
            {texts.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
