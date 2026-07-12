"use client";

import { ArrowLeftRight, ArrowRight, Copy, Ellipsis, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverSubHeader, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ListCopyForm } from "./list-copy-form";
import { ListDeleteConfirm } from "./list-delete-confirm";
import { ListMoveForm } from "./list-move-form";

type MenuView = "menu" | "delete-confirm" | "copy-list" | "move-list";

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

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setView("menu");
  }

  function handleAddCard() {
    handleOpenChange(false);
    onAddCard();
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
      <PopoverContent align="start" className="w-72 gap-3">
        {view === "delete-confirm" ? (
          <ListDeleteConfirm
            boardId={boardId}
            listId={listId}
            onBack={() => setView("menu")}
            onDone={() => handleOpenChange(false)}
          />
        ) : view === "copy-list" ? (
          <ListCopyForm
            boardId={boardId}
            listId={listId}
            listTitle={listTitle}
            onBack={() => setView("menu")}
            onDone={() => handleOpenChange(false)}
          />
        ) : view === "move-list" ? (
          <ListMoveForm
            open={open}
            boardId={boardId}
            listId={listId}
            onBack={() => setView("menu")}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <>
            <PopoverSubHeader title="List actions" />
            <MenuItem icon={<Plus className="size-4" />} label="Add card" onClick={handleAddCard} />
            <MenuItem
              icon={<Copy className="size-4" />}
              label="Copy list"
              onClick={() => setView("copy-list")}
            />
            <MenuItem
              icon={<ArrowLeftRight className="size-4" />}
              label="Move list"
              onClick={() => setView("move-list")}
            />
            <MenuItem
              icon={<ArrowRight className="size-4" />}
              label="Move all cards in this list"
            />

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
