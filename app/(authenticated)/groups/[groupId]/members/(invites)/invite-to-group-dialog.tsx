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

import { Input } from "@/components/ui/input";
import { InviteUserToGroupSchema } from "./inviteUserToGroupSchema";
import { useFormState } from "react-dom";
import { inviteUser } from "./actions";
import { Label } from "@/components/ui/label";
import { SubmitButton, Field } from "@/components/forms";
import { FieldMessage } from "@/components/forms/field-message";

interface SetGoalDialogProps {
  defaultValues: InviteUserToGroupSchema;
}

const initialFormState = {
  message: null,
};

export function InviteToGroupDialog({
  children,
  defaultValues,
}: PropsWithChildren<SetGoalDialogProps>) {
  const [state, action] = useFormState(inviteUser, initialFormState);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Mitglied einladen</DialogHeader>
        <DialogDescription>
          Bitte gebe die E-Mail Adresse des Benutzers ein, dass du zur Gruppe
          einladen möchtest.
        </DialogDescription>
        <form id="form" action={action}>
          <input type="hidden" name="groupId" value={defaultValues.groupId} />

          <Field>
            <Label htmlFor="email">E-Mail (*)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required={true}
              placeholder="foo@bar.com"
            />
            <FieldMessage>{state?.message}</FieldMessage>
          </Field>
        </form>
        <DialogFooter>
          <SubmitButton>Mitglied einladen</SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
