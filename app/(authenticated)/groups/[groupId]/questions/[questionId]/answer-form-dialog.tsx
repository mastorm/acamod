"use client";
import React, { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { answerSchema, AnswerSchema } from "./answerSchema";
import { useToast } from "@/components/ui/use-toast";

interface AnswerFormDialogProps {
  onSave: (payload: AnswerSchema) => Promise<void>;
  texts: {
    description: string;
    saveButton: string;
    toast: {
      title: string;
      description: string;
    };
  };
}

export function AnswerFormDialog({
  onSave,
  texts,
  children,
}: PropsWithChildren<AnswerFormDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<AnswerSchema>({
    resolver: zodResolver(answerSchema),
    defaultValues: { content: "" },
  });

  async function onSubmit(values: AnswerSchema) {
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
        <DialogDescription>{texts.description}</DialogDescription>
        <Form {...form}>
          <form id="createAnswerForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detaillierte Antwort (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ausführliche Antwort" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createAnswerForm">
            {texts.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
