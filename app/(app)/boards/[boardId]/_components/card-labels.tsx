"use client";

import { Plus } from "lucide-react";
import { useRef } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CardLabel } from "@/lib/api/boards";

import { CardLabelsPopoverContent } from "./card-labels-popover";
import { getLabelTooltipText, LabelSwatch } from "./label-swatch";

export function CardLabels({
  boardId,
  cardId,
  labels,
}: {
  boardId: string;
  cardId: string;
  labels: CardLabel[];
}) {
  const labelsAnchorRef = useRef<HTMLDivElement>(null);

  if (labels.length === 0) return null;

  return (
    <div ref={labelsAnchorRef}>
      <div className="mb-1.5 text-xs font-semibold text-slate-500">Labels</div>
      <Popover>
        <div className="flex flex-wrap items-center gap-1.5">
          {labels.map((label) => (
            <Tooltip key={label.id}>
              <TooltipTrigger
                render={
                  <PopoverTrigger
                    nativeButton={false}
                    render={
                      <LabelSwatch
                        label={label}
                        className="h-7 min-w-10 cursor-pointer justify-center rounded-md px-2.5 text-[13px]"
                      />
                    }
                  />
                }
              />
              <TooltipContent side="top" showArrow={false}>
                {getLabelTooltipText(label)}
              </TooltipContent>
            </Tooltip>
          ))}
          <PopoverTrigger
            nativeButton={false}
            render={
              <span
                aria-label="Add label"
                className="flex size-7 cursor-pointer items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
              />
            }
          >
            <Plus className="size-3.5" />
          </PopoverTrigger>
        </div>
        <PopoverContent anchor={labelsAnchorRef} align="start" className="w-72 gap-2">
          <CardLabelsPopoverContent boardId={boardId} cardId={cardId} cardLabels={labels} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
