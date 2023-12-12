"use client";

import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
export function Editor() {
  const [note, setNote] = useState("");
  return (
    <div>
      {note}
      <ReactQuill theme="snow" value={note} onChange={setNote}></ReactQuill>
    </div>
  );
}
