"use client";

import { useMemo, useState } from "react";

import { PopoverSubHeader } from "@/components/ui/popover";

import { CardCoverSearch } from "../[boardId]/_components/card-cover-search";
import {
  useUnsplashPhotos,
  useUnsplashSearch,
  useUnsplashSearchPhotos,
} from "../_hooks/use-unsplash-photos";
import { BoardBackgroundPicker, BoardColorsPicker } from "./board-background-picker";

type FlowView = "browse" | "photos" | "colors";

export function BoardBackgroundFlow({
  open,
  value,
  onChange,
  onBack,
  title = "Board background",
}: {
  open: boolean;
  value: string;
  onChange: (value: string, downloadLocation?: string) => void;
  onBack: () => void;
  title?: string;
}) {
  const [view, setView] = useState<FlowView>("browse");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: panelPhotos } = useUnsplashPhotos(open && view === "browse", 6);

  const hasQuery = searchQuery.trim().length > 0;

  const {
    data: randomPages,
    fetchNextPage: fetchNextRandomPage,
    hasNextPage: hasNextRandomPage,
    isFetchingNextPage: isFetchingNextRandomPage,
  } = useUnsplashSearchPhotos(open && view === "photos" && !hasQuery, 20);

  const {
    data: searchPages,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useUnsplashSearch(open && view === "photos" && hasQuery, searchQuery, 20);

  const searchedPhotos = useMemo(() => {
    const pages = hasQuery ? searchPages?.pages.map((page) => page.photos) : randomPages?.pages;
    return pages?.flat();
  }, [hasQuery, searchPages, randomPages]);

  const fetchNextPage = hasQuery ? fetchNextSearchPage : fetchNextRandomPage;
  const hasNextPage = hasQuery ? hasNextSearchPage : hasNextRandomPage;
  const isFetchingNextPage = hasQuery ? isFetchingNextSearchPage : isFetchingNextRandomPage;

  if (view === "photos") {
    return (
      <CardCoverSearch
        value={value}
        onChange={onChange}
        photos={searchedPhotos}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onBack={() => setView("browse")}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    );
  }

  if (view === "colors") {
    return (
      <>
        <PopoverSubHeader title="Colors" onBack={() => setView("browse")} />
        <BoardColorsPicker value={value} onChange={onChange} />
      </>
    );
  }

  return (
    <>
      <PopoverSubHeader title={title} onBack={onBack} />
      <BoardBackgroundPicker
        value={value}
        onChange={onChange}
        photos={panelPhotos}
        onViewMorePhotos={() => setView("photos")}
        onViewMoreColors={() => setView("colors")}
      />
    </>
  );
}
