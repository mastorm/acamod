import { Tab, TabType, Tabs } from "@/components/layout/tabs";
import { ComponentIcon, MailQuestionIcon, UserIcon } from "lucide-react";

function getTabs(groupId: number) {
  return [
    {
      title: "Module",
      url: `/groups/${groupId}/modules`,
      icon: <ComponentIcon />,
    },
    {
      title: "Mitglieder",
      url: `/groups/${groupId}/members`,
      icon: <UserIcon />,
    },
    {
      title: "Fragen",
      url: `/groups/${groupId}/questions`,
      icon: <MailQuestionIcon />,
    },
  ] satisfies TabType[];
}

export function ModuleTabs({ groupId }: { groupId: number }) {
  return (
    <Tabs>
      {getTabs(groupId).map((tab) => (
        <Tab key={tab.url} tab={tab} />
      ))}
    </Tabs>
  );
}
