"use client";

import { Plus, Star } from "lucide-react";

export interface BoardTileProps {
  title: string;
  background: string;
  favorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
}

export function BoardTile({ title, background, favorite, onOpen, onToggleFavorite }: BoardTileProps) {
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
      style={{ background }}
      className="relative flex h-30 flex-col rounded-[11px] bg-cover bg-center px-3.5 py-3.25 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
    >
      <div className="pr-6.5 text-[15px] leading-tight font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.22)]">
        {title}
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label="Favorite board"
          className="flex size-7 items-center justify-center rounded-md bg-white/18 hover:bg-white/32"
        >
          <Star className="size-3.75 text-white" fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

export function CreateBoardTile({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Create new board"
      className="flex h-30 flex-col items-center justify-center gap-2 rounded-[11px] border-[1.5px] border-dashed border-slate-300 text-slate-600 hover:border-primary hover:bg-blue-50/50 hover:text-primary"
    >
      <Plus className="size-5.5" strokeWidth={2.2} />
      <span className="text-[13px] font-semibold">Create new board</span>
    </button>
  );
}
