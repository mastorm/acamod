import { PropsWithChildren, ReactNode } from "react";

interface DetailLayoutProps {
  title: string;
  subtitle: string | undefined;
  actions?: ReactNode;
}

export function DetailLayout({
  title,
  actions,
  subtitle,
  children,
}: PropsWithChildren<DetailLayoutProps>) {
  return (
    <main>
      <header className="pb-6">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-3xl font-bold ">{title}</h1>
            {subtitle && <span className="font-extralight">{subtitle}</span>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      </header>
      {children}
    </main>
  );
}
