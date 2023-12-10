"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Tab } from "./module-tabs";
import { useMemo } from "react";
import { cva } from "class-variance-authority";

const tabStyle = cva("p-2 rounded hover:bg-accent", {
  variants: {
    isActive: {
      true: "border-b-accent border-b",
      false: "",
    },
  },
});

export function ModuleTab({ tab }: { tab: Tab }) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname == tab.url;
  }, [pathname, tab.url]);

  return (
    <Link href={tab.url}>
      <div className={tabStyle({ isActive })}>{tab.title}</div>
    </Link>
  );
}
