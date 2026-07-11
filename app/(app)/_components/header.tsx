"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { AccountMenu } from "./account-menu";
import { useBoardChrome } from "../_context/app-shell";
import { NotificationsButton } from "./notifications-button";
import { CreateBoardPopover } from "../boards/_components/create-board-popover";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { background } = useBoardChrome();

  return (
    <header
      className={cn(
        "flex h-14 flex-none items-center gap-3.5 px-3.5  border-b-[0.5px]",
        background ? "bg-black/40" : "bg-background",
        background ? "border-white/15" : "border-border",
      )}
    >
      <Logo className={cn("shrink-0", background ? "text-white" : "text-foreground")} />

      <div className="flex flex-1 items-center justify-center gap-2.5">
        <div className="relative max-w-2xl flex-1">
          <Search
            className={cn(
              "absolute top-1/2 left-2.75 size-4 -translate-y-1/2",
              background ? "text-white/70" : "text-muted-foreground",
            )}
          />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search boards"
            className={cn(
              "w-full h-8 pl-8.5 focus-visible:ring-0",
              background
                ? "border-transparent bg-white/20 text-white placeholder:text-white/70 focus-visible:border-transparent focus-visible:bg-white/25"
                : "bg-muted focus-visible:border-border focus-visible:bg-background",
            )}
          />
        </div>
        <CreateBoardPopover>
          <Button
            size="default"
            className="shrink-0 gap-1.75 shadow-[0_1px_2px_--theme(--color-primary/30%)]"
          >
            Create
          </Button>
        </CreateBoardPopover>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NotificationsButton />
        <AccountMenu />
      </div>
    </header>
  );
}
