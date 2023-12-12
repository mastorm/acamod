"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
export function Editor() {
  const [note, setNote] = useState("");

  return (
    <div className="grid gap-2">
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <Button className="place-self-end">Speichern</Button>
    </div>
  );
}
