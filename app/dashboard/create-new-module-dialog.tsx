import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createModuleSchema } from "./createModuleSchema";

export function CreateNewModuleDialog({ children }: PropsWithChildren) {
  const form = useForm<z.infer<typeof createModuleSchema>>({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      moduleName: "",
    },
  });

  function onSubmit(values: z.infer<typeof createModuleSchema>) {
    console.log(values);
  }
  return (
    <Dialog>
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
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="createModuleForm">
            Erstellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
