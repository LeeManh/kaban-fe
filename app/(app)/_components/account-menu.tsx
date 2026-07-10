"use client";

import { LogOut, Settings, SunMoon, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { clearTokens } from "@/lib/api/tokens";
import { cn, getInitials } from "@/lib/utils";

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
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                />
              }
            >
              <Avatar className="size-6">
                {user?.avatar && <AvatarImage src={user.avatar} alt="" />}
                <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">
                  {user ? getInitials(user) : ""}
                </AvatarFallback>
              </Avatar>
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
            <Avatar className="size-8">
              {user?.avatar && <AvatarImage src={user.avatar} alt="" />}
              <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">
                {user ? getInitials(user) : ""}
              </AvatarFallback>
            </Avatar>
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
