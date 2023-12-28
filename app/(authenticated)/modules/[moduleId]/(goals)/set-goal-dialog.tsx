"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { GoalSchema, goalSchema } from "./goalSchema";

interface SetGoalDialogProps {
  onSave: (payload: GoalSchema) => Promise<void>;
  defaultValues: GoalSchema;
}

export function SetGoalDialog({
  children,
  onSave,
  defaultValues,
}: PropsWithChildren<SetGoalDialogProps>) {
  const { toast } = useToast();
  const form = useForm<GoalSchema>({
    resolver: zodResolver(goalSchema),
    defaultValues: defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: GoalSchema) {
    setBusy(true);
    try {
      await onSave(values);

      toast({
        title: "Ziel gesetzt!",
        description: "Dein Ziel wurde erfolgreich gesetzt!",
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
        <DialogHeader>Modulziel setzen</DialogHeader>
        <DialogDescription>
          Bitte wähle aus, bis wann du das Modul abgeschlossen haben möchtest.
        </DialogDescription>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zieldatum (*)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      required={true}
                      placeholder="Zieldatum"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="form">
            Ziel setzen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
