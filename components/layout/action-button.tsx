import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

export function ActionButton({ children }: PropsWithChildren) {
  return <Button variant="ghost">{children}</Button>;
}
