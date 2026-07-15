"use client";

import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Checklist } from "@/lib/api/cards";
import { cn } from "@/lib/utils";

import { useCreateChecklistItem } from "../_hooks/use-create-checklist-item";
import { useDeleteChecklist } from "../_hooks/use-delete-checklist";
import { useDeleteChecklistItem } from "../_hooks/use-delete-checklist-item";
import { useToggleChecklistItem } from "../_hooks/use-toggle-checklist-item";
import { useUpdateChecklist } from "../_hooks/use-update-checklist";
import { useUpdateChecklistItem } from "../_hooks/use-update-checklist-item";
import { CardChecklistDeletePopover } from "./card-checklist-delete-popover";
import { CardChecklistItemForm } from "./card-checklist-item-form";

export function CardChecklist({ boardId, checklist }: { boardId: string; checklist: Checklist }) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(checklist.title);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemContent, setEditingItemContent] = useState("");

  const deleteChecklist = useDeleteChecklist(boardId);
  const updateChecklist = useUpdateChecklist(boardId);
  const createChecklistItem = useCreateChecklistItem(boardId);
  const toggleChecklistItem = useToggleChecklistItem(boardId);
  const deleteChecklistItem = useDeleteChecklistItem(boardId);
  const updateChecklistItem = useUpdateChecklistItem(boardId);

  const doneCount = checklist.items.filter((item) => item.isDone).length;
  const percent =
    checklist.items.length > 0 ? Math.round((doneCount / checklist.items.length) * 100) : 0;

  function closeAddItem() {
    setIsAddingItem(false);
    setNewItemContent("");
  }

  function commitTitle() {
    const trimmed = titleDraft.trim();
    if (!trimmed) {
      setTitleDraft(checklist.title);
      setIsEditingTitle(false);
      return;
    }
    setIsEditingTitle(false);
    if (trimmed !== checklist.title) {
      updateChecklist.mutate({ checklistId: checklist.id, title: trimmed });
    }
  }

  function cancelTitle() {
    setTitleDraft(checklist.title);
    setIsEditingTitle(false);
  }

  function submitNewItem() {
    const trimmed = newItemContent.trim();
    if (!trimmed) return;
    createChecklistItem.mutate(
      { checklistId: checklist.id, content: trimmed },
      { onSuccess: () => setNewItemContent("") },
    );
  }

  function openEditItem(itemId: string, content: string) {
    setEditingItemId(itemId);
    setEditingItemContent(content);
  }

  function closeEditItem() {
    setEditingItemId(null);
    setEditingItemContent("");
  }

  function submitEditItem() {
    const trimmed = editingItemContent.trim();
    if (!editingItemId || !trimmed) return;
    updateChecklistItem.mutate(
      { itemId: editingItemId, content: trimmed },
      { onSuccess: closeEditItem },
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        {isEditingTitle ? (
          <div className="flex flex-1 items-center gap-2">
            <CheckSquare className="size-4 shrink-0 text-foreground" />
            <Input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                if (e.key === "Escape") cancelTitle();
              }}
              className="h-auto flex-1 px-2 py-1 text-sm font-semibold text-foreground"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingTitle(true)}
            className="flex flex-1 cursor-pointer items-center gap-2 rounded-sm px-1 py-1 text-left text-sm font-semibold text-foreground hover:bg-accent"
          >
            <CheckSquare className="size-4" />
            {checklist.title}
          </button>
        )}
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
        {checklist.items.map((item) =>
          editingItemId === item.id ? (
            <CardChecklistItemForm
              key={item.id}
              className="px-1.5 py-1"
              value={editingItemContent}
              onChange={setEditingItemContent}
              onSubmit={submitEditItem}
              onCancel={closeEditItem}
              isPending={updateChecklistItem.isPending}
              submitLabel="Save"
              pendingLabel="Saving…"
              checkbox={{
                checked: item.isDone,
                onCheckedChange: () => toggleChecklistItem.mutate(item.id),
              }}
            />
          ) : (
            <div
              key={item.id}
              className="group flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-accent"
            >
              <Checkbox
                checked={item.isDone}
                onCheckedChange={() => toggleChecklistItem.mutate(item.id)}
                className="cursor-pointer"
              />
              <button
                type="button"
                onClick={() => openEditItem(item.id, item.content)}
                className={cn(
                  "flex-1 cursor-pointer text-left text-[13.5px] text-foreground",
                  item.isDone && "text-muted-foreground line-through",
                )}
              >
                {item.content}
              </button>
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
          ),
        )}
      </div>

      {isAddingItem ? (
        <CardChecklistItemForm
          className="mt-1.5"
          value={newItemContent}
          onChange={setNewItemContent}
          onSubmit={submitNewItem}
          onCancel={closeAddItem}
          isPending={createChecklistItem.isPending}
          placeholder="Add an item"
          submitLabel="Add"
          pendingLabel="Adding…"
        />
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
