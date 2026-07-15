"use client";

import { ArrowLeftRight, ArrowRight, Copy, Ellipsis, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverSubHeader, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ListCopyForm } from "./list-copy-form";
import { ListDeleteConfirm } from "./list-delete-confirm";
import { ListMoveAllCardsForm } from "./list-move-all-cards-form";
import { ListMoveForm } from "./list-move-form";

type MenuView = "menu" | "delete-confirm" | "copy-list" | "move-list" | "move-all-cards";

function MenuItem({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-foreground hover:bg-accent"
    >
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
      <PopoverContent align="start" className="w-60 gap-3">
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
        ) : view === "move-all-cards" ? (
          <ListMoveAllCardsForm
            open={open}
            boardId={boardId}
            listId={listId}
            onBack={() => setView("menu")}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <>
            <PopoverSubHeader title="List actions" />
            <MenuItem label="Add card" onClick={handleAddCard} />
            <MenuItem label="Copy list" onClick={() => setView("copy-list")} />
            <MenuItem label="Move list" onClick={() => setView("move-list")} />
            <MenuItem
              label="Move all cards in this list"
              onClick={() => setView("move-all-cards")}
            />

            <div className="my-1 h-px bg-border" />

            <button
              type="button"
              onClick={() => setView("delete-confirm")}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-destructive hover:bg-destructive/10"
            >
              Delete list
            </button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
