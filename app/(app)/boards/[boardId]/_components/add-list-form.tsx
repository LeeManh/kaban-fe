"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/use-click-outside";

import { useCreateList } from "../_hooks/use-create-list";

export function AddListForm({ boardId }: { boardId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const createList = useCreateList(boardId);

  function close() {
    setIsAdding(false);
    setTitle("");
    createList.reset();
  }

  const formRef = useClickOutside<HTMLFormElement>(close);

  function submit() {
    const trimmed = title.trim();
    if (!trimmed || createList.isPending) return;

    createList.mutate({ title: trimmed }, { onSuccess: () => setTitle("") });
  }

  if (!isAdding) {
    return (
      <button
        type="button"
        onClick={() => setIsAdding(true)}
        className="flex w-70 shrink-0 items-center gap-1.5 rounded-md bg-white px-3 py-2 text-[13.5px] font-medium text-slate-700 shadow-sm hover:bg-slate-200"
      >
        <Plus className="size-4" />
        Add another list
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex w-70 shrink-0 flex-col gap-2 rounded-md bg-slate-100 p-2"
    >
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
        placeholder="Enter list name…"
        className="bg-white text-sm shadow-sm"
      />
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={!title.trim() || createList.isPending}>
          Add list
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Cancel" onClick={close}>
          <X className="size-4" />
        </Button>
      </div>
    </form>
  );
}
