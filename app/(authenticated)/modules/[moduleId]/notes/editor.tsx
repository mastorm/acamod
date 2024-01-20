"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SaveAllIcon, SaveIcon } from "lucide-react";

interface EditorProps {
  initial: string;
  moduleId: number;
  onNoteChange: (moduleId: number, note: string) => Promise<void>;
}
export function Editor({ initial, moduleId, onNoteChange }: EditorProps) {
  const [note, setNote] = useState(initial);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  async function handleSave() {
    setLoading(true);
    await onNoteChange(moduleId, note);
    setLoading(false);
    toast({
      title: "Notiz gespeichert",
      description: "Deine Notiz wurde gespeichert",
    });
  }

  return (
    <div className="grid gap-2">
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <Button
        disabled={loading}
        className="place-self-end"
        onClick={handleSave}
        variant="outline"
      >
        <SaveIcon className="mr-2" />
        Speichern
      </Button>
    </div>
  );
}
