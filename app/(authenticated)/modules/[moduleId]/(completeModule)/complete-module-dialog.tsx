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
import {
  CompleteModuleSchemaType,
  completeModuleSchema,
} from "./complete-module-schema";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CheckCheckIcon } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface CompleteModuleDialogProps {
  onSave: (values: CompleteModuleSchemaType) => Promise<void>;
  defaultValues: CompleteModuleSchemaType;
}

export function CompleteModuleDialog({
  children,
  onSave,
  defaultValues,
}: PropsWithChildren<CompleteModuleDialogProps>) {
  const { toast } = useToast();
  const form = useForm<CompleteModuleSchemaType>({
    resolver: zodResolver(completeModuleSchema),
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: CompleteModuleSchemaType) {
    setBusy(true);
    try {
      await onSave(values);

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
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2 pb-2">
              <FormField
                control={form.control}
                name="attempts"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prüfungsversuche</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Punkte</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="completedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bestanden am(*)</FormLabel>
                  <FormControl>
                    <Input type="date" required={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <FormField
                control={form.control}
                name="passed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Bestanden</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} variant="outline" type="submit" form="form">
            <CheckCheckIcon className="mr-2" />
            Modul abschließen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
