"use client";

import { Check, Circle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function CardTitle({
  title,
  isDone,
  onToggleDone,
}: {
  title: string;
  isDone: boolean;
  onToggleDone: () => void;
}) {
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
            <Circle className="size-4 text-slate-400" />
          )}
        </TooltipTrigger>
        <TooltipContent side="top" showArrow={false}>
          {isDone ? "Mark incomplete" : "Mark complete"}
        </TooltipContent>
      </Tooltip>
      <h2 className="text-xl leading-snug font-semibold text-slate-900">{title}</h2>
    </div>
  );
}
