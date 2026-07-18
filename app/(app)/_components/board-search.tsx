"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, toBackgroundStyle } from "@/lib/utils";

import { useBoards } from "../boards/_hooks/use-boards";
import { useRecentlyViewedBoards } from "../boards/_hooks/use-recently-viewed-boards";

export function BoardSearch({ background }: { background: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { data: boards = [] } = useBoards({ enabled: open });
  const { data: recentlyViewed = [] } = useRecentlyViewedBoards({ enabled: open });

  const trimmedQuery = query.trim().toLowerCase();
  const hasQuery = trimmedQuery.length > 0;

  const searchResults = useMemo(
    () => boards.filter((board) => board.name.toLowerCase().includes(trimmedQuery)),
    [boards, trimmedQuery],
  );
  const recentBoards = useMemo(() => recentlyViewed.map((entry) => entry.board), [recentlyViewed]);

  const results = hasQuery ? searchResults : recentBoards;
  const listLabel = hasQuery ? "Search results" : "Recent boards";

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="relative sm:flex-1">
        <Search
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 sm:left-2.75 sm:translate-x-0",
            background ? "text-white/70" : "text-muted-foreground",
          )}
        />
        <DialogTrigger
          render={
            <button
              type="button"
              aria-label="Search boards"
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-sm text-left text-sm sm:h-8 sm:w-full sm:justify-start sm:pl-8.5",
                background
                  ? "hover:bg-white/15 sm:bg-white/20 sm:text-white/70 sm:hover:bg-white/25"
                  : "hover:bg-accent sm:bg-muted sm:text-muted-foreground",
              )}
            >
              <span className="hidden sm:inline">Search</span>
            </button>
          }
        />
      </div>

      <DialogContent showCloseButton={false} className="gap-1 p-2 sm:max-w-md">
        <DialogTitle className="sr-only">Search boards</DialogTitle>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.75 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search boards"
            aria-label="Search boards"
            className="h-9 rounded-sm bg-muted pl-8.5 focus-visible:border-border focus-visible:bg-background focus-visible:ring-0"
          />
        </div>

        <div className="px-2 pt-2 pb-1.5 text-[11px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
          {listLabel}
        </div>
        {results.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-muted-foreground">
            {hasQuery ? "No boards found" : "No recently viewed boards"}
          </p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto">
            {results.map((board) => (
              <Link
                key={board.id}
                href={`/boards/${board.id}`}
                onClick={() => handleOpenChange(false)}
                className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent"
              >
                <span
                  style={{ background: toBackgroundStyle(board.background) }}
                  className="size-9 shrink-0 rounded-sm bg-cover bg-center"
                />
                <span className="truncate text-[13.5px] font-medium text-foreground">
                  {board.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
