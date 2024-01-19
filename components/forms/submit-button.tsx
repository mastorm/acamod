import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";

export function SubmitButton({ children }: PropsWithChildren) {
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit" form="form">
      {children}
    </Button>
  );
}
