"use client";

import {
  CreditCard,
  ExternalLink,
  HelpCircle,
  Keyboard,
  LogOut,
  Settings,
  SunMoon,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";

export function AccountMenu() {
  const router = useRouter();
  const { background } = useBoardChrome();

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
                <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">
                  L
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
              <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">
                L
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">Kanvas User</span>
              <span className="truncate text-xs text-muted-foreground">you@example.com</span>
            </div>
          </div>
          <DropdownMenuItem>
            <User />
            Switch accounts
          </DropdownMenuItem>
          <DropdownMenuItem>
            Manage account
            <ExternalLink className="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Kanvas</DropdownMenuLabel>
          <DropdownMenuItem>
            <User />
            Profile and visibility
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Zap />
            Activity
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Cards
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Zap />
            Labs
            <Badge variant="secondary" className="ml-auto">
              Labs
            </Badge>
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
          <DropdownMenuItem>
            <Users />
            Create Workspace
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HelpCircle />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            Shortcuts
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
