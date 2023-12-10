import { urls } from "@/lib/urls";
import { ModuleTab } from "./module-tab";
export interface Tab {
  url: string;
  title: string;
}

function getTabs(moduleId: number) {
  const tabs: Tab[] = [
    {
      url: urls.moduleDetails(moduleId, "notes"),
      title: "Notizen",
    },
    {
      url: urls.moduleDetails(moduleId, "files"),
      title: "Dateien",
    },
  ];

  return tabs;
}

interface ModuleTabsProps {
  moduleId: number;
}

export default function ModuleTabs({ moduleId }: ModuleTabsProps) {
  const tabs = getTabs(moduleId);
  return (
    <div className=" flex gap-4 p-2 border border-accent rounded">
      {tabs.map((x) => (
        <ModuleTab key={x.url} tab={x} />
      ))}
    </div>
  );
}
