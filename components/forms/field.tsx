import { PropsWithChildren } from "react";

export function Field({ children }: PropsWithChildren) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}
