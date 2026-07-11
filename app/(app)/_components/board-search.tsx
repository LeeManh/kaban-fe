"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const recentBoards = useMemo(
    () => recentlyViewed.map((entry) => entry.board),
    [recentlyViewed],
  );

  const results = hasQuery ? searchResults : recentBoards;
  const listLabel = hasQuery ? "Search results" : "Recent boards";

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  function handleSelect() {
    setOpen(false);
    setQuery("");
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div className="relative flex-1">
        <Search
          className={cn(
            "pointer-events-none absolute top-1/2 left-2.75 z-10 size-4 -translate-y-1/2",
            background ? "text-white/70" : "text-muted-foreground",
          )}
        />
        <PopoverTrigger
          nativeButton={false}
          render={
            <Input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              placeholder="Search"
              aria-label="Search boards"
              className={cn(
                "w-full h-8 pl-8.5 focus-visible:ring-0",
                background
                  ? "border-transparent bg-white/20 text-white placeholder:text-white/70 focus-visible:border-transparent focus-visible:bg-white/25"
                  : "bg-muted focus-visible:border-border focus-visible:bg-background",
              )}
            />
          }
        />
      </div>

      <PopoverContent
        align="start"
        initialFocus={false}
        className="w-(--anchor-width) gap-1 p-2"
      >
        <div className="px-2 pt-1 pb-1.5 text-[11px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
          {listLabel}
        </div>
        {results.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-muted-foreground">
            {hasQuery ? "No boards found" : "No recently viewed boards"}
          </p>
        ) : (
          results.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              onClick={handleSelect}
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
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
