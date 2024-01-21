import { PropsWithChildren } from "react";

export function ModuleCollection({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  );
}
