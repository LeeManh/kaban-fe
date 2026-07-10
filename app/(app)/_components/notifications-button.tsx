"use client";

import { Bell, BellOff, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getApiErrorMessage } from "@/lib/api/client";
import type { Notification } from "@/lib/api/notifications";
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";
import { useMarkAllNotificationsRead } from "../_hooks/use-mark-all-notifications-read";
import { useMarkNotificationRead } from "../_hooks/use-mark-notification-read";
import { useNotifications } from "../_hooks/use-notifications";
import { useUnreadNotificationsCount } from "../_hooks/use-unread-notifications-count";
import { NotificationRow } from "./notification-row";

export function NotificationsButton() {
  const router = useRouter();
  const { background } = useBoardChrome();
  const [open, setOpen] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(true);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotifications(
    open,
    onlyUnread,
  );

  const notifications = data?.pages.flatMap((page) => page.items) ?? [];

  const { data: unreadCount = 0 } = useUnreadNotificationsCount();
  const markAllRead = useMarkAllNotificationsRead();
  const markRead = useMarkNotificationRead();

  function handleMarkAllRead() {
    markAllRead.mutate(undefined, {
      onError: (error) => toast.error(getApiErrorMessage(error)),
    });
  }

  function handleNotificationClick(notification: Notification) {
    setOpen(false);
    if (!notification.isRead) {
      markRead.mutate(notification.id, {
        onError: (error) => toast.error(getApiErrorMessage(error)),
      });
    }
  }

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
                    "flex size-8 items-center justify-center rounded-md",
                    background
                      ? "text-white hover:bg-white/15"
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                />
              }
            >
              <span className="relative flex">
                <Bell className="size-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
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
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <PopoverTitle className="text-base font-semibold text-slate-900">
            Notifications
          </PopoverTitle>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-600">
              Only show unread
              <Switch checked={onlyUnread} onCheckedChange={setOnlyUnread} size="sm" />
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="More options"
                    className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                  />
                }
              >
                <Ellipsis className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-44">
                <DropdownMenuItem
                  disabled={unreadCount === 0 || markAllRead.isPending}
                  onClick={handleMarkAllRead}
                >
                  Mark all as read
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(false);
                    router.push("/settings");
                  }}
                >
                  Notification settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="max-h-100 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <p className="text-sm text-slate-500">Loading…</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <BellOff className="size-10 text-slate-300" />
              <p className="text-sm text-slate-500">
                {onlyUnread ? "No unread notifications" : "No notifications yet"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {notifications.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
              {hasNextPage && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isFetchingNextPage}
                  className="mt-1 cursor-pointer"
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading…" : "Load more"}
                </Button>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
