"use client";

import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  Copy,
  Ellipsis,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverSubHeader, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { useCopyList } from "../_hooks/use-copy-list";
import { useDeleteList } from "../_hooks/use-delete-list";

type MenuView = "menu" | "delete-confirm" | "copy-list";

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-foreground hover:bg-accent"
    >
      {icon}
      <span className="flex-1">{label}</span>
    </button>
  );
}

export function ListActionsMenu({
  boardId,
  listId,
  listTitle,
  onAddCard,
}: {
  boardId: string;
  listId: string;
  listTitle: string;
  onAddCard: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");
  const [copyTitle, setCopyTitle] = useState(listTitle);

  const deleteList = useDeleteList(boardId);
  const copyList = useCopyList(boardId);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setView("menu");
  }

  function handleDelete() {
    deleteList.mutate(listId, { onSuccess: () => handleOpenChange(false) });
  }

  function handleAddCard() {
    handleOpenChange(false);
    onAddCard();
  }

  function openCopyList() {
    setCopyTitle(listTitle);
    setView("copy-list");
  }

  function handleCopy() {
    const trimmed = copyTitle.trim();
    if (!trimmed) return;
    copyList.mutate(
      { listId, payload: { title: trimmed } },
      {
        onSuccess: () => {
          toast.success("List copied.");
          handleOpenChange(false);
        },
      },
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  variant="subtle"
                  size="icon-sm"
                  aria-label="List actions"
                  onPointerDown={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                />
              }
            >
              <Ellipsis className="size-3.75" />
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          List actions
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="start" className="w-64 gap-3">
        {view === "delete-confirm" ? (
          <>
            <PopoverSubHeader title="Delete list?" onBack={() => setView("menu")} />
            <p className="text-[13px] text-muted-foreground">
              Deleting a list is permanent and will delete all cards in it. There is no way to get
              it back.
            </p>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              disabled={deleteList.isPending}
              onClick={handleDelete}
            >
              {deleteList.isPending ? "Deleting…" : "Delete list"}
            </Button>
          </>
        ) : view === "copy-list" ? (
          <>
            <PopoverSubHeader title="Copy list" onBack={() => setView("menu")} />
            <div>
              <div className="mb-1.5 text-xs font-semibold text-foreground">Name</div>
              <Input
                autoFocus
                value={copyTitle}
                onChange={(e) => setCopyTitle(e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCopy();
                }}
              />
            </div>
            <Button
              className="w-full cursor-pointer"
              disabled={!copyTitle.trim() || copyList.isPending}
              onClick={handleCopy}
            >
              {copyList.isPending ? "Creating…" : "Create list"}
            </Button>
          </>
        ) : (
          <>
            <PopoverSubHeader title="List actions" />
            <MenuItem icon={<Plus className="size-4" />} label="Add card" onClick={handleAddCard} />
            <MenuItem icon={<Copy className="size-4" />} label="Copy list" onClick={openCopyList} />
            <MenuItem icon={<ArrowLeftRight className="size-4" />} label="Move list" />
            <MenuItem
              icon={<ArrowRight className="size-4" />}
              label="Move all cards in this list"
            />
            <MenuItem icon={<ArrowUpDown className="size-4" />} label="Sort by" />

            <div className="my-1 h-px bg-border" />

            <button
              type="button"
              onClick={() => setView("delete-confirm")}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-4" />
              Delete list
            </button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
