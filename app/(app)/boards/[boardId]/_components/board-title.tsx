"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { useUpdateBoard } from "../_hooks/use-update-board";

export function BoardTitle({ boardId, name: initialName }: { boardId: string; name: string }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(initialName);
  const updateBoard = useUpdateBoard(boardId);

  function commit() {
    setIsEditingName(false);

    const trimmed = name.trim();
    if (!trimmed) {
      setName(initialName);
      return;
    }

    setName(trimmed);
    if (trimmed !== initialName) {
      updateBoard.mutate({ name: trimmed });
    }
  }

  function cancel() {
    setName(initialName);
    setIsEditingName(false);
  }

  if (isEditingName) {
    return (
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") cancel();
        }}
        className="mr-1 h-7 min-w-24 max-w-90 bg-white px-2 py-1 text-base font-bold text-slate-800 field-sizing-content md:text-base"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditingName(true)}
      className="mr-1 flex items-center rounded-sm py-1 px-2 text-base font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/15 h-7"
    >
      {name}
    </button>
  );
}
