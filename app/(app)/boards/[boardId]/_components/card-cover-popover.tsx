"use client";

import { ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";

import {
  useUnsplashPhotos,
  useUnsplashSearch,
  useUnsplashSearchPhotos,
} from "@/app/(app)/boards/_hooks/use-unsplash-photos";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { CardCoverPicker } from "./card-cover-picker";
import { CardCoverSearch } from "./card-cover-search";

export function CardCoverPopover({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"cover" | "search">("cover");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: unsplashPhotos } = useUnsplashPhotos(open, 6);

  const hasQuery = searchQuery.trim().length > 0;

  const {
    data: randomPages,
    fetchNextPage: fetchNextRandomPage,
    hasNextPage: hasNextRandomPage,
    isFetchingNextPage: isFetchingNextRandomPage,
  } = useUnsplashSearchPhotos(open && view === "search" && !hasQuery, 20);

  const {
    data: searchPages,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useUnsplashSearch(open && view === "search" && hasQuery, searchQuery, 20);

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
      setView("cover");
      setSearchQuery("");
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label="Cover image"
                  className="cursor-pointer rounded-full bg-white/90 text-slate-800 hover:bg-white"
                />
              }
            >
              <ImageIcon className="size-4" />
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          Cover image
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="start" className="w-80 gap-3">
        {view === "search" ? (
          <CardCoverSearch
            value={value}
            onChange={onChange}
            photos={photos}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onBack={() => setView("cover")}
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isLoadingMore={isFetchingNextPage}
          />
        ) : (
          <CardCoverPicker
            value={value}
            onChange={onChange}
            photos={unsplashPhotos}
            onSearchClick={() => setView("search")}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
