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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { TimeSpentSchemaType, timeSpentSchema } from "./time-module-schema";
import { Input } from "@/components/ui/input";
import { CheckCheckIcon } from "lucide-react";

interface TimeSpentDialogProps {
  onSave: (values: TimeSpentSchemaType) => Promise<void>;
  defaultValues: TimeSpentSchemaType;
}

export function TimeSpentDialog({
  children,
  onSave,
  defaultValues,
}: PropsWithChildren<TimeSpentDialogProps>) {
  const { toast } = useToast();
  const form = useForm<TimeSpentSchemaType>({
    resolver: zodResolver(timeSpentSchema),
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: TimeSpentSchemaType) {
    setBusy(true);
    try {
      await onSave(values);

      toast({
        title: "Zeit erfasst!",
        description:
          "Die aufgewendete Zeit für das Modul wurde erfolgreich gespeichert.",
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
        <DialogHeader>Zeit für Modul erfassen</DialogHeader>
        <DialogDescription>
          Gib die Anzahl der Stunden an, die du für dieses Modul aufgewendet
          hast.
        </DialogDescription>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="hoursSpent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stunden</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.25}
                      min={0}
                      max={500}
                      placeholder="150"
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
          <Button disabled={busy} variant="outline" type="submit" form="form">
            <CheckCheckIcon className="mr-2" />
            Zeit erfassen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
