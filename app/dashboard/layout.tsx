import { SiteHeader } from "@/components/layout/site-header";
import { PropsWithChildren } from "react";

export default function UiLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1 container pt-2">{children}</div>
      </div>
    </>
  );
}
