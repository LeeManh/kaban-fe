"use client";

import { Plus, UserPlus } from "lucide-react";
import { useRef } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CardAssignee, CardLabel } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { CardLabelsPopoverContent } from "./card-labels-popover";

export function CardMembersLabels({
  boardId,
  cardId,
  assignees,
  labels,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
  labels: CardLabel[];
}) {
  const labelsAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-500">Members</div>
        <div className="flex items-center gap-1">
          {assignees.map((assignee) => (
            <Avatar key={assignee.id} className="size-7">
              <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
                {getInitials(assignee)}
              </AvatarFallback>
            </Avatar>
          ))}
          <button
            type="button"
            aria-label="Add member"
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-100"
          >
            <UserPlus className="size-3.5" />
          </button>
        </div>
      </div>

      {labels.length > 0 && (
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
                          <span
                            style={{ backgroundColor: label.color }}
                            className="flex h-7 min-w-10 cursor-pointer items-center justify-center rounded-md px-2.5 text-[13px] font-medium text-black"
                          />
                        }
                      >
                        {label.name}
                      </PopoverTrigger>
                    }
                  />
                  <TooltipContent side="top" showArrow={false}>
                    {`Color: ${label.color}, title: "${label.name}"`}
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
      )}
    </>
  );
}
