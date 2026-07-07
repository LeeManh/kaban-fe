"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import { useUpdateList } from "../_hooks/use-update-list";

export function ListTitle({
  boardId,
  listId,
  title: initialTitle,
}: {
  boardId: string;
  listId: string;
  title: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const updateList = useUpdateList(boardId);

  function commit() {
    setIsEditing(false);

    const trimmed = title.trim();
    if (!trimmed) {
      setTitle(initialTitle);
      return;
    }

    setTitle(trimmed);
    if (trimmed !== initialTitle) {
      updateList.mutate({ listId, title: trimmed });
    }
  }

  function cancel() {
    setTitle(initialTitle);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={commit}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") cancel();
        }}
        className="h-7 flex-1 px-2 py-1 text-[13.5px] font-semibold text-slate-700"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      onPointerDown={(e) => e.stopPropagation()}
      className="flex-1 truncate rounded-sm px-1 py-1 text-left text-[13.5px] font-semibold text-slate-700 hover:bg-slate-200"
    >
      {title}
    </button>
  );
}
