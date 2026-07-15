"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toBackgroundStyle } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

import { useSearchTemplates } from "../_hooks/use-search-templates";
import { TEMPLATE_CATEGORIES } from "../_lib/template-categories";

const SEARCH_PAGE_SIZE = 20;

export function TemplateSearchInput({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  const hasQuery = debouncedQuery.length > 0;

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useSearchTemplates(
    debouncedQuery,
    SEARCH_PAGE_SIZE,
    { enabled: open && hasQuery },
  );
  const results = data?.pages.flatMap((page) => page.items) ?? [];

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  function handleSelect() {
    setOpen(false);
    setQuery("");
  }

  return (
    <Popover open={open && hasQuery} onOpenChange={handleOpenChange}>
      <div className={className ?? "relative w-80 shrink-0"}>
        <Search className="pointer-events-none absolute top-1/2 left-2.75 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
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
              placeholder="Find template"
              aria-label="Find template"
              className="h-9 pl-8.5"
            />
          }
        />
      </div>

      <PopoverContent align="start" initialFocus={false} className="w-(--anchor-width) gap-1 p-2">
        {isFetching && results.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-muted-foreground">Searching…</p>
        ) : results.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-muted-foreground">
            No results for &quot;{debouncedQuery}&quot;
          </p>
        ) : (
          <>
            <div className="flex max-h-96 flex-col gap-1 overflow-y-auto">
              {results.map((template) => {
                const category = TEMPLATE_CATEGORIES.find(
                  (item) => item.value === template.templateCategory,
                );
                return (
                  <Link
                    key={template.id}
                    href={
                      category
                        ? `/templates/${category.slug}/${template.id}`
                        : `/templates`
                    }
                    onClick={handleSelect}
                    className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent"
                  >
                    <span
                      style={{ background: toBackgroundStyle(template.background) }}
                      className="size-9 shrink-0 rounded-sm bg-cover bg-center"
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[13.5px] font-medium text-foreground">
                        {template.name}
                      </span>
                      {category && (
                        <span className="truncate text-[12px] text-muted-foreground">
                          {category.label}
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
            {hasNextPage && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full cursor-pointer"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </Button>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
