import { PropsWithChildren } from "react";

export function Tabs({ children }: PropsWithChildren) {
  return <div className=" flex gap-4">{children}</div>;
}
