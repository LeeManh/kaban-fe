"use client";

import { ChevronLeft, Ellipsis, Star, Tag, UserPlus, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  useUnsplashPhotos,
  useUnsplashSearch,
  useUnsplashSearchPhotos,
} from "@/app/(app)/boards/_hooks/use-unsplash-photos";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BoardDetail } from "@/lib/api/boards";
import { cn, toBackgroundStyle } from "@/lib/utils";

import { useToggleBoardStar } from "../../_hooks/use-toggle-board-star";
import { useUpdateBoard } from "../_hooks/use-update-board";
import { CardCoverPicker } from "./card-cover-picker";
import { CardCoverSearch } from "./card-cover-search";
import { CardLabelsPopoverContent } from "./card-labels-popover";

type MenuView = "menu" | "background" | "background-search" | "labels";

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
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium text-slate-700 hover:bg-slate-100"
    >
      {icon}
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

export function BoardMoreOptionsMenu({
  board,
  onOpenShare,
}: {
  board: BoardDetail;
  onOpenShare: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<MenuView>("menu");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStar = useToggleBoardStar();
  const updateBoard = useUpdateBoard(board.id);

  const { data: unsplashPhotos } = useUnsplashPhotos(open && view === "background", 6);

  const hasQuery = searchQuery.trim().length > 0;

  const {
    data: randomPages,
    fetchNextPage: fetchNextRandomPage,
    hasNextPage: hasNextRandomPage,
    isFetchingNextPage: isFetchingNextRandomPage,
  } = useUnsplashSearchPhotos(open && view === "background-search" && !hasQuery, 20);

  const {
    data: searchPages,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useUnsplashSearch(open && view === "background-search" && hasQuery, searchQuery, 20);

  const photos = useMemo(() => {
    const pages = hasQuery ? searchPages?.pages.map((page) => page.photos) : randomPages?.pages;
    return pages?.flat();
  }, [hasQuery, searchPages, randomPages]);

  const fetchNextPage = hasQuery ? fetchNextSearchPage : fetchNextRandomPage;
  const hasNextPage = hasQuery ? hasNextSearchPage : hasNextRandomPage;
  const isFetchingNextPage = hasQuery ? isFetchingNextSearchPage : isFetchingNextRandomPage;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setView("menu");
      setSearchQuery("");
    }
  }

  function handleBackgroundChange(value: string) {
    updateBoard.mutate({ background: value });
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="More options"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15"
                />
              }
            >
              <Ellipsis className="size-4" />
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          More options
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="end" className="max-h-[80vh] w-80 gap-3 overflow-y-auto">
        {view === "background" ? (
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Back"
                className="cursor-pointer"
                onClick={() => setView("menu")}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <PopoverTitle className="flex-1 text-center text-sm font-semibold text-slate-900">
                Change background
              </PopoverTitle>
              <PopoverClose
                render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}
              >
                <X className="size-3.5" />
                <span className="sr-only">Close</span>
              </PopoverClose>
            </div>
            <CardCoverPicker
              value={board.background}
              onChange={handleBackgroundChange}
              photos={unsplashPhotos}
              onSearchClick={() => setView("background-search")}
            />
          </>
        ) : view === "background-search" ? (
          <CardCoverSearch
            value={board.background}
            onChange={handleBackgroundChange}
            photos={photos}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onBack={() => setView("background")}
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isLoadingMore={isFetchingNextPage}
          />
        ) : view === "labels" ? (
          <CardLabelsPopoverContent boardId={board.id} onBack={() => setView("menu")} />
        ) : (
          <div className="flex flex-col gap-1">
            <div className="mb-1 flex items-center justify-between">
              <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">
                Menu
              </PopoverTitle>
              <PopoverClose
                render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}
              >
                <X className="size-3.5" />
                <span className="sr-only">Close</span>
              </PopoverClose>
            </div>

            <MenuItem icon={<UserPlus className="size-4" />} label="Share" onClick={onOpenShare} />
            <MenuItem
              icon={
                <Star
                  className={cn("size-4", board.isStarred && "text-yellow-400")}
                  fill={board.isStarred ? "currentColor" : "none"}
                />
              }
              label={board.isStarred ? "Unstar" : "Star"}
              onClick={() => toggleStar.mutate({ boardId: board.id, isStarred: board.isStarred })}
            />

            <div className="my-1 h-px bg-slate-200" />

            <MenuItem
              icon={
                <span
                  style={{ background: toBackgroundStyle(board.background) }}
                  className="size-4 rounded-sm bg-cover bg-center"
                />
              }
              label="Change background"
              onClick={() => setView("background")}
            />
            <MenuItem
              icon={<Tag className="size-4" />}
              label="Labels"
              onClick={() => setView("labels")}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
