"use client";

import { Ellipsis, Star, Tag, UserPlus } from "lucide-react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverSubHeader, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BoardDetail } from "@/lib/api/boards";
import { cn, toBackgroundStyle } from "@/lib/utils";

import { BoardBackgroundFlow } from "../../_components/board-background-flow";
import { useToggleBoardStar } from "../../_hooks/use-toggle-board-star";
import { useUpdateBoard } from "../_hooks/use-update-board";
import { CardLabelsPopoverContent } from "./card-labels-popover";

type MenuView = "menu" | "background" | "labels";

function MenuItem({
  icon,
  label,
  trailing,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-foreground hover:bg-accent"
    >
      {icon}
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

export function BoardMoreOptionsMenu({
  board,
  onOpenShare,
}: {
  board: BoardDetail;
  onOpenShare: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");

  const toggleStar = useToggleBoardStar();
  const updateBoard = useUpdateBoard(board.id);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setView("menu");
  }

  function handleBackgroundChange(value: string) {
    updateBoard.mutate({ background: value });
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="More options"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15"
                />
              }
            >
              <Ellipsis className="size-4" />
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          More options
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="end" className="max-h-[80vh] w-64 gap-3 overflow-y-auto">
        {view === "background" ? (
          <BoardBackgroundFlow
            open={open}
            value={board.background}
            onChange={handleBackgroundChange}
            onBack={() => setView("menu")}
            title="Change background"
          />
        ) : view === "labels" ? (
          <CardLabelsPopoverContent boardId={board.id} onBack={() => setView("menu")} />
        ) : (
          <div className="flex flex-col gap-1">
            <PopoverSubHeader title="Menu" className="mb-1" />

            <MenuItem icon={<UserPlus className="size-4" />} label="Share" onClick={onOpenShare} />
            <MenuItem
              icon={
                <Star
                  className={cn("size-4", board.isStarred && "text-yellow-400")}
                  fill={board.isStarred ? "currentColor" : "none"}
                />
              }
              label={board.isStarred ? "Unstar" : "Star"}
              onClick={() => toggleStar.mutate({ boardId: board.id, isStarred: board.isStarred })}
            />

            <div className="my-1 h-px bg-border" />

            <MenuItem
              icon={
                <span
                  style={{ background: toBackgroundStyle(board.background) }}
                  className="size-4 rounded-sm bg-cover bg-center"
                />
              }
              label="Change background"
              onClick={() => setView("background")}
            />
            <MenuItem
              icon={<Tag className="size-4" />}
              label="Labels"
              onClick={() => setView("labels")}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
