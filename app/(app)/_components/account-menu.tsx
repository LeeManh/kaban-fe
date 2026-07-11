"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { clearTokens } from "@/lib/api/tokens";
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";
import { useCurrentUser } from "../_hooks/use-current-user";

export function AccountMenu() {
  const router = useRouter();
  const { background } = useBoardChrome();
  const { data: user } = useCurrentUser();

  function handleLogout() {
    clearTokens();
    router.replace("/login");
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="Account menu"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md",
                    background
                      ? "text-white hover:bg-white/15"
                      : "text-muted-foreground hover:bg-accent",
                  )}
                />
              }
            >
              <UserAvatar user={user} className="size-6" fallbackClassName="text-xs" />
            </DropdownMenuTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          Account
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-70">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <div className="flex items-center gap-2.5 px-1.5 py-1.5">
            <UserAvatar user={user} className="size-8" fallbackClassName="text-xs" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{user?.name ?? user?.email}</span>
              <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Kanvas</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
