import { urls } from "@/lib/urls";
import { Tab, TabType, Tabs } from "@/components/layout/tabs";

function getTabs(moduleId: number) {
  const tabs: TabType[] = [
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
    <Tabs>
      {tabs.map((x) => (
        <Tab key={x.url} tab={x} />
      ))}
    </Tabs>
  );
}
