"use client";

import { Check, Circle } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { useUpdateCard } from "../_hooks/use-update-card";

export function CardTitle({
  boardId,
  cardId,
  version,
  title: initialTitle,
  isDone,
  onToggleDone,
}: {
  boardId: string;
  cardId: string;
  version: number;
  title: string;
  isDone: boolean;
  onToggleDone: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const updateCard = useUpdateCard(boardId);

  function commit() {
    setIsEditing(false);

    const trimmed = title.trim();
    if (!trimmed) {
      setTitle(initialTitle);
      return;
    }

    setTitle(trimmed);
    if (trimmed !== initialTitle) {
      updateCard.mutate({ cardId, version, title: trimmed });
    }
  }

  function cancel() {
    setTitle(initialTitle);
    setIsEditing(false);
  }

  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={onToggleDone}
              aria-label={isDone ? "Mark incomplete" : "Mark complete"}
              className="flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full"
            />
          }
        >
          {isDone ? (
            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500">
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </span>
          ) : (
            <Circle className="size-4 text-muted-foreground" />
          )}
        </TooltipTrigger>
        <TooltipContent side="top" showArrow={false}>
          {isDone ? "Mark incomplete" : "Mark complete"}
        </TooltipContent>
      </Tooltip>

      {isEditing ? (
        <Input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") cancel();
          }}
          className="h-auto flex-1 px-2 py-1 text-xl font-semibold text-foreground"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex-1 rounded-sm px-1 py-1 text-left text-xl leading-snug font-semibold text-foreground hover:bg-foreground/10"
        >
          {title}
        </button>
      )}
    </div>
  );
}
