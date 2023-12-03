import { PropsWithChildren, ReactNode } from "react";

interface DetailLayoutProps {
  title: string;
  actions?: ReactNode;
}

export function DetailLayout({
  title,
  actions,
  children,
}: PropsWithChildren<DetailLayoutProps>) {
  return (
    <main>
      <header className="pb-6">
        <div className="flex">
          <h1 className=" flex-1 text-3xl font-bold ">{title}</h1>
          <div>{actions}</div>
        </div>
      </header>
      {children}
    </main>
  );
}
