"use client";

import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useClickOutside } from "@/hooks/use-click-outside";
import type { Checklist } from "@/lib/api/cards";
import { cn } from "@/lib/utils";

import { useCreateChecklistItem } from "../_hooks/use-create-checklist-item";
import { useDeleteChecklist } from "../_hooks/use-delete-checklist";
import { useDeleteChecklistItem } from "../_hooks/use-delete-checklist-item";
import { useToggleChecklistItem } from "../_hooks/use-toggle-checklist-item";
import { CardChecklistDeletePopover } from "./card-checklist-delete-popover";

export function CardChecklist({ boardId, checklist }: { boardId: string; checklist: Checklist }) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");

  const deleteChecklist = useDeleteChecklist(boardId);
  const createChecklistItem = useCreateChecklistItem(boardId);
  const toggleChecklistItem = useToggleChecklistItem(boardId);
  const deleteChecklistItem = useDeleteChecklistItem(boardId);

  const doneCount = checklist.items.filter((item) => item.isDone).length;
  const percent =
    checklist.items.length > 0 ? Math.round((doneCount / checklist.items.length) * 100) : 0;

  function closeAddItem() {
    setIsAddingItem(false);
    setNewItemContent("");
  }

  const addItemRef = useClickOutside<HTMLDivElement>(closeAddItem);

  function submitNewItem() {
    const trimmed = newItemContent.trim();
    if (!trimmed) return;
    createChecklistItem.mutate(
      { checklistId: checklist.id, content: trimmed },
      { onSuccess: () => setNewItemContent("") },
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <CheckSquare className="size-4" />
          {checklist.title}
        </div>
        <CardChecklistDeletePopover
          isDeleting={deleteChecklist.isPending}
          onConfirm={() => deleteChecklist.mutate(checklist.id)}
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{percent}%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {checklist.items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-accent"
          >
            <Checkbox
              checked={item.isDone}
              onCheckedChange={() => toggleChecklistItem.mutate(item.id)}
            />
            <span
              className={cn(
                "flex-1 text-[13.5px] text-foreground",
                item.isDone && "text-muted-foreground line-through",
              )}
            >
              {item.content}
            </span>
            <div className="invisible flex items-center gap-1 group-hover:visible">
              <button
                type="button"
                aria-label="Delete item"
                onClick={() => deleteChecklistItem.mutate(item.id)}
                className="flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingItem ? (
        <div ref={addItemRef} className="mt-1.5">
          <Textarea
            autoFocus
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            placeholder="Add an item"
            className="resize-none text-[13.5px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitNewItem();
              }
              if (e.key === "Escape") closeAddItem();
            }}
          />
          <div className="mt-1.5 flex items-center gap-2">
            <Button
              size="sm"
              className="cursor-pointer"
              disabled={!newItemContent.trim() || createChecklistItem.isPending}
              onClick={submitNewItem}
            >
              {createChecklistItem.isPending ? "Adding…" : "Add"}
            </Button>
            <Button variant="ghost" size="sm" className="cursor-pointer" onClick={closeAddItem}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAddingItem(true)}
          className="mt-1.5 flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-muted-foreground hover:bg-accent"
        >
          <Plus className="size-3.75" />
          Add an item
        </button>
      )}
    </div>
  );
}
