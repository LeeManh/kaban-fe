"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AccountMenu } from "./account-menu";
import { BoardSearch } from "./board-search";
import { useBoardChrome } from "../_context/app-shell";
import { NotificationsButton } from "./notifications-button";
import { CreateBoardPopover } from "../boards/_components/create-board-popover";

export function Header() {
  const { background } = useBoardChrome();

  return (
    <header
      className={cn(
        "flex h-14 flex-none items-center gap-3.5 px-3.5  border-b-[0.5px]",
        background ? "bg-black/40" : "bg-background",
        background ? "border-white/15" : "border-border",
      )}
    >
      <Link href="/boards" className="shrink-0 cursor-pointer">
        <Logo className={cn(background ? "text-white" : "text-foreground")} />
      </Link>

      <div className="flex flex-1 items-center justify-center gap-2.5">
        <div className="max-w-2xl flex-1">
          <BoardSearch background={!!background} />
        </div>
        <CreateBoardPopover>
          <Button
            size="sm"
            className="shrink-0 gap-1.75 shadow-[0_1px_2px_--theme(--color-primary/30%)] h-8"
          >
            Create
          </Button>
        </CreateBoardPopover>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle
          className={cn(
            background ? "text-white hover:bg-white/15" : "text-muted-foreground hover:bg-accent",
          )}
        />
        <NotificationsButton />
        <AccountMenu />
      </div>
    </header>
  );
}
