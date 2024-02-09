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
import { IsBestAnswerSchema, isBestAnswerSchema } from "./bestAnswerSchema";
import { CheckCheckIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface BestAnswerDialogProps {
  onSave: (values: IsBestAnswerSchema) => Promise<void>;
  defaultValues: IsBestAnswerSchema;
}

export function BestAnswerDialog({
  children,
  onSave,
  defaultValues,
}: PropsWithChildren<BestAnswerDialogProps>) {
  const { toast } = useToast();
  const form = useForm<IsBestAnswerSchema>({
    resolver: zodResolver(isBestAnswerSchema),
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(values: IsBestAnswerSchema) {
    setBusy(true);
    try {
      await onSave(values);

      toast({
        title: "Beste Antwort ausgewählt!",
        description: "Deine Frage wurde als beantwortet markiert!",
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
        <DialogHeader>Frage als beantwortet markieren</DialogHeader>
        <DialogDescription>
          Wenn diese Antwort deine Frage beantwortet hat? Dann kannst du es hier
          als beste Antwort markieren.
        </DialogDescription>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pt-4"></div>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} variant="outline" type="submit" form="form">
            <CheckCheckIcon className="mr-2" />
            Antwort markieren
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
