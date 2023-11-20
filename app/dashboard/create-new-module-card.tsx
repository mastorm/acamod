"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderPlus } from "lucide-react";
import { CreateNewModuleDialog } from "./create-new-module-dialog";

export function CreateNewModuleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neues Modul</CardTitle>
      </CardHeader>

      <CardContent>
        <CreateNewModuleDialog>
          <button className="p-8 hover:bg-secondary/90 w-full border rounded grid place-items-center">
            <FolderPlus />
            Neues Modul erstellen
          </button>
        </CreateNewModuleDialog>
      </CardContent>
    </Card>
  );
}
