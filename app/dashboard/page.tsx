import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderPlus } from "lucide-react";
import { CreateNewModuleCard } from "./create-new-module-card";

export default async function Page() {
  return (
    <main>
      <h1 className="text-2xl font-bold pb-6">Module</h1>
      {/* TODO: Show list of modules here*/}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <CreateNewModuleCard />
      </div>
    </main>
  );
}
