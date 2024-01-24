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
import { questionSchema, QuestionSchema } from "./questionSchema";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface QuestionFormDialogProps {
  onSave: (payload: QuestionSchema) => Promise<void>;
  texts: {
    description: string;
    title: string;
    saveButton: string;
    toast: {
      title: string;
      description: string;
    };
  };
}

export function QuestionFormDialog({
  onSave,
  texts,
  children,
}: PropsWithChildren<QuestionFormDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: { title: "", content: "" },
  });

  async function onSubmit(values: QuestionSchema) {
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
          <form id="createQuestionForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fragen Überschrift (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Überschrift der Frage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detaillierte Frage (*)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ausführliche Frage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createQuestionForm">
            {texts.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
