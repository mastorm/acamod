"use client";

import { usePathname } from "next/navigation";
import type { TabType } from "./types";
import { useMemo } from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";

const tabStyle = cva("p-2 hover:bg-accent flex gap-4", {
  variants: {
    isActive: {
      true: "border-b-accent border-b",
      false: "font-thin",
    },
  },
});

export function Tab({ tab }: { tab: TabType }) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname == tab.url;
  }, [pathname, tab.url]);

  return (
    <Link href={tab.url}>
      <div className={tabStyle({ isActive })}>
        {tab.icon}
        {tab.title}
      </div>
    </Link>
  );
}
