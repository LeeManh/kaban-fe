"use client";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { DUE_STATUS_BADGE_CLASSNAME, DUE_STATUS_LABEL, getDueStatus } from "../_lib/due-status";
import { CardDueDatePopoverContent } from "./card-due-date-popover";

export function CardDueDate({
  boardId,
  cardId,
  version,
  dueDate,
  reminderOffsetMinutes,
  isDone,
}: {
  boardId: string;
  cardId: string;
  version: number;
  dueDate: string;
  reminderOffsetMinutes: number | null;
  isDone: boolean;
}) {
  const status = getDueStatus(dueDate, isDone);

  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-muted-foreground">Due date</div>
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-2.5 py-1.5 text-[13px] font-medium text-foreground hover:bg-accent"
            />
          }
        >
          {new Date(dueDate).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
          {status !== "upcoming" && (
            <Badge className={DUE_STATUS_BADGE_CLASSNAME[status]}>{DUE_STATUS_LABEL[status]}</Badge>
          )}
          <ChevronDown className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 gap-2">
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
