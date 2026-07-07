"use client";

import { X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@/components/ui/popover";
import type { CardAssignee } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

export function CardMemberPopoverContent({
  assignee,
  onRemove,
}: {
  assignee: CardAssignee;
  onRemove: () => void;
}) {
  const handle = assignee.email.split("@")[0];

  return (
    <>
      <div className="relative flex items-center gap-3 bg-blue-600 px-4 py-4 text-white">
        <PopoverClose
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              className="absolute top-2 right-2 cursor-pointer text-white hover:bg-white/20"
            />
          }
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </PopoverClose>
        <Avatar className="size-14 shrink-0 ring-3 ring-white">
          <AvatarFallback className="bg-violet-500 text-lg font-bold text-white">
            {getInitials(assignee)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="truncate text-base font-bold">{assignee.name ?? assignee.email}</div>
          <div className="truncate text-sm text-blue-100">@{handle}</div>
        </div>
      </div>
      <div className="flex flex-col py-1.5">
        <button
          type="button"
          className="cursor-pointer px-4 py-2.5 text-left text-[13.5px] text-slate-700 hover:bg-slate-100"
        >
          View profile
        </button>
        <div className="h-px bg-slate-200" />
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer px-4 py-2.5 text-left text-[13.5px] text-slate-700 hover:bg-slate-100"
        >
          Remove from card
        </button>
      </div>
    </>
  );
}
