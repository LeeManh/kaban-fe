"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";
import { useNotificationsRealtime } from "../_hooks/use-notifications-realtime";
import { useUnreadNotificationsCount } from "../_hooks/use-unread-notifications-count";
import { NotificationsPopoverContent } from "./notifications-popover-content";

export function NotificationsButton() {
  const { background } = useBoardChrome();
  const [open, setOpen] = useState(false);

  useNotificationsRealtime();

  const { data: unreadCount = 0 } = useUnreadNotificationsCount();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="Notifications"
                  className={cn(
                    "hidden size-8 items-center justify-center rounded-md sm:flex",
                    background
                      ? "text-white hover:bg-white/15"
                      : "text-muted-foreground hover:bg-accent",
                  )}
                />
              }
            >
              <span className="relative flex">
                <Bell className="size-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          Notifications
        </TooltipContent>
      </Tooltip>

      <PopoverContent align="end" className="max-h-[80vh] w-96 gap-0 overflow-hidden p-0">
        <NotificationsPopoverContent open={open} onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
