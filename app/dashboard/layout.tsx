import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";

export default function UiLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1 container pt-6">{children}</div>
      </div>
      <Toaster />
    </>
  );
}
