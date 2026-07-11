import { Check, ChevronLeft, X } from "lucide-react";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SUGGESTED_SEARCHES = [
  "Productivity",
  "Perspective",
  "Organization",
  "Colorful",
  "Nature",
  "Business",
  "Minimal",
  "Space",
  "Animals",
];

export function CardCoverSearch({
  value,
  onChange,
  photos,
  searchQuery,
  onSearchQueryChange,
  onBack,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: {
  value: string;
  onChange: (value: string) => void;
  photos?: UnsplashPhoto[];
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onBack: () => void;
  onLoadMore: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Back"
          className="cursor-pointer"
          onClick={onBack}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <PopoverTitle className="flex-1 text-center text-sm font-semibold text-foreground">
          Photo search
        </PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
        <Input
          autoFocus
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search Unsplash for photos"
          className="shrink-0 focus-visible:ring-0"
        />

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Suggested searches</div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSearchQueryChange(term)}
                className={cn(
                  "cursor-pointer rounded-md border px-2.5 py-1 text-[13px] font-medium",
                  searchQuery === term
                    ? "border-border bg-muted text-foreground"
                    : "border-border text-foreground hover:bg-accent",
                )}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Top photos</div>
          <div className="grid grid-cols-3 gap-1.5">
            {photos?.map((photo) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`Cover photo by ${photo.authorName}`}
                onClick={() => onChange(photo.regularUrl)}
                style={{ backgroundImage: `url(${photo.thumbUrl})` }}
                className="relative h-14 cursor-pointer rounded-md bg-cover bg-center hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {value === photo.regularUrl && (
                  <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-white">
                    <Check className="size-2.5 text-slate-900" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
          {hasMore && (
            <Button
              variant="outline"
              size="sm"
              className="mt-1.5 w-full cursor-pointer"
              disabled={isLoadingMore}
              onClick={onLoadMore}
            >
              {isLoadingMore ? "Loading…" : "Load more"}
            </Button>
          )}
        </div>

        <p className="text-right text-[11px] text-muted-foreground">
          Photos from{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            Unsplash
          </a>
        </p>
      </div>
    </>
  );
}
