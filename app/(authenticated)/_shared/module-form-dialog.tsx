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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  ModuleSchema,
  moduleSchema,
} from "@/app/(authenticated)/_shared/moduleSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateNewModuleDialogProps {
  onSave: (payload: ModuleSchema) => Promise<void>;
  defaultValues: ModuleSchema;
  groups: { id: number; name: string }[];
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

export function ModuleFormDialog({
  children,
  onSave,
  defaultValues,
  groups,
  texts,
}: PropsWithChildren<CreateNewModuleDialogProps>) {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<ModuleSchema>({
    resolver: zodResolver(moduleSchema),
    defaultValues,
  });

  async function onSubmit(values: ModuleSchema) {
    setBusy(true);
    await onSave(values);

    toast({
      title: texts.toast.title,
      description: texts.toast.description,
    });
    setBusy(false);
    //TODO: Navigate to created module when a detail page exists
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{texts.title}</DialogHeader>
        <DialogDescription>{texts.description}</DialogDescription>
        <Form {...form}>
          <form id="createModuleForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modulbezeichnung (*)</FormLabel>
                    <FormControl>
                      <Input placeholder="Mathematik I" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sharedWithGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geteilt mit Gruppe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gruppe wählen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          <em>- Keine -</em>
                        </SelectItem>

                        {groups.map((group) => (
                          <SelectItem
                            key={group.id}
                            value={group.id.toString()}
                          >
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Bei Auswahl einer Gruppe können die Mitglieder der Gruppe
                      alle Modulinhalte sehen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="shortCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kürzel</FormLabel>
                      <FormControl>
                        <Input placeholder="IMT01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credits</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={20}
                          placeholder="5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled={busy} type="submit" form="createModuleForm">
            {texts.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
