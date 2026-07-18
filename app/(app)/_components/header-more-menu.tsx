"use client";

import { Bell, Ellipsis, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverSubHeader, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useUnreadNotificationsCount } from "../_hooks/use-unread-notifications-count";
import { NotificationsPopoverContent } from "./notifications-popover-content";

type MenuView = "menu" | "notifications";

function MenuItem({
  icon,
  label,
  trailing,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-foreground hover:bg-accent"
    >
      {icon}
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

export function HeaderMoreMenu({ background }: { background: boolean }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setView("menu");
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label="More"
            className={cn(
              "relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md sm:hidden",
              background ? "text-white hover:bg-white/15" : "text-muted-foreground hover:bg-accent",
            )}
          />
        }
      >
        <Ellipsis className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-destructive" />
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className={cn(
          view === "notifications" ? "max-h-[80vh] w-96 gap-0 overflow-hidden p-0" : "w-64 gap-1",
        )}
      >
        {view === "notifications" ? (
          <NotificationsPopoverContent
            open={open}
            onClose={() => handleOpenChange(false)}
            onBack={() => setView("menu")}
          />
        ) : (
          <div className="flex flex-col gap-1">
            <PopoverSubHeader title="Menu" className="mb-1" />

            <MenuItem
              icon={isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
              label={`Switch to ${isDark ? "light" : "dark"} theme`}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            />
            <MenuItem
              icon={<Bell className="size-4" />}
              label="Notifications"
              trailing={
                unreadCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )
              }
              onClick={() => setView("notifications")}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
