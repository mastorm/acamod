import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";

interface SubmitButtonProps {
  form?: string;
}

export function SubmitButton({
  children,
  form,
}: PropsWithChildren<SubmitButtonProps>) {
  const status = useFormStatus();

  return (
    <Button
      variant="outline"
      disabled={status.pending}
      type="submit"
      form={form}
    >
      {children}
    </Button>
  );
}
