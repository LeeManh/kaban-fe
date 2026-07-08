"use client";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CardDueDatePopoverContent } from "./card-due-date-popover";

export function CardDueDate({
  boardId,
  cardId,
  version,
  dueDate,
  reminderOffsetMinutes,
  isOverdue,
}: {
  boardId: string;
  cardId: string;
  version: number;
  dueDate: string;
  reminderOffsetMinutes: number | null;
  isOverdue: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-slate-500">Due date</div>
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-[13px] font-medium text-slate-700 hover:bg-slate-200"
            />
          }
        >
          {new Date(dueDate).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
          {isOverdue && (
            <Badge variant="destructive" className="bg-red-600 text-white">
              Overdue
            </Badge>
          )}
          <ChevronDown className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 gap-2">
          <CardDueDatePopoverContent
            boardId={boardId}
            cardId={cardId}
            version={version}
            dueDate={dueDate}
            reminderOffsetMinutes={reminderOffsetMinutes}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
