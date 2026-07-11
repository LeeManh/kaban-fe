"use client";

import { Plus, Star } from "lucide-react";

import { cn, toBackgroundStyle } from "@/lib/utils";

import { CreateBoardPopover } from "./create-board-popover";

export interface BoardCardProps {
  title: string;
  background: string;
  favorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
}

export function BoardCard({
  title,
  background,
  favorite,
  onOpen,
  onToggleFavorite,
}: BoardCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex h-30 flex-col overflow-hidden rounded-md bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <div
        style={{ background: toBackgroundStyle(background) }}
        className="relative min-h-0 flex-1 bg-cover bg-center"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label="Favorite board"
          className={cn(
            "absolute top-2 right-2 flex size-6 items-center justify-center rounded-md bg-black/20 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-black/30",
            favorite && "bg-black/35 opacity-100",
          )}
        >
          <Star className="size-4" fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex h-9 shrink-0 items-center px-3.5">
        <span className="truncate text-[14px] font-medium text-foreground">{title}</span>
      </div>
    </div>
  );
}

export function CreateBoardCard() {
  return (
    <CreateBoardPopover>
      <button
        type="button"
        aria-label="Create new board"
        className="flex h-30 flex-col items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-border text-muted-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
      >
        <Plus className="size-5.5" strokeWidth={2.2} />
        <span className="text-[13px] font-semibold">Create new board</span>
      </button>
    </CreateBoardPopover>
  );
}
