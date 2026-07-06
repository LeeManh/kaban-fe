"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useClickOutside } from "@/hooks/use-click-outside";

import { useCreateCard } from "../_hooks/use-create-card";

export function AddCardForm({ boardId, listId }: { boardId: string; listId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const createCard = useCreateCard(boardId, listId);

  function close() {
    setIsAdding(false);
    setTitle("");
    createCard.reset();
  }

  const formRef = useClickOutside<HTMLFormElement>(close);

  function submit() {
    const trimmed = title.trim();
    if (!trimmed || createCard.isPending) return;

    createCard.mutate({ title: trimmed }, { onSuccess: () => setTitle("") });
  }

  if (!isAdding) {
    return (
      <button
        type="button"
        onClick={() => setIsAdding(true)}
        className="mt-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-slate-500 hover:bg-slate-200"
      >
        <Plus className="size-3.75" />
        Add a card
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
      className="mt-1.5 flex flex-col gap-2"
    >
      <Textarea
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
          if (e.key === "Escape") close();
        }}
        placeholder="Enter a title or paste a link"
        className="min-h-16 resize-none bg-white text-sm shadow-sm"
      />
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={!title.trim() || createCard.isPending}>
          Add card
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Cancel" onClick={close}>
          <X className="size-4" />
        </Button>
      </div>
    </form>
  );
}
