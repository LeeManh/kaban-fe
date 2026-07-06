"use client";

import { Bell } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";

export function NotificationsButton() {
  const { background } = useBoardChrome();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Notifications"
            className={cn(
              "flex size-8 items-center justify-center rounded-md",
              background ? "text-white hover:bg-white/15" : "text-slate-600 hover:bg-slate-100",
            )}
          />
        }
      >
        <Bell className="size-4" />
      </TooltipTrigger>
      <TooltipContent side="bottom" showArrow={false}>
        Notifications
      </TooltipContent>
    </Tooltip>
  );
}
