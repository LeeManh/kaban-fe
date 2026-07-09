"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";

import { useCreateChecklist } from "../_hooks/use-create-checklist";

export function CardChecklistPopoverContent({
  boardId,
  cardId,
}: {
  boardId: string;
  cardId: string;
}) {
  const [title, setTitle] = useState("Checklist");
  const createChecklist = useCreateChecklist(boardId);

  function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed) return;
    createChecklist.mutate({ cardId, title: trimmed });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">Add checklist</PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-700">Title</div>
        <Input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
      </div>

      <PopoverClose
        render={
          <Button
            className="w-full cursor-pointer"
            disabled={!title.trim() || createChecklist.isPending}
            onClick={handleAdd}
          />
        }
      >
        {createChecklist.isPending ? "Adding…" : "Add"}
      </PopoverClose>
    </div>
  );
}
