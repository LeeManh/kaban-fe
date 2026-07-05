"use client";

import { Bell } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function NotificationsButton() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
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
