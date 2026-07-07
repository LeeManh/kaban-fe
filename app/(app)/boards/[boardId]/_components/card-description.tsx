"use client";

import { AlignLeft, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CardDescription({
  description,
  expanded,
  onToggleExpanded,
}: {
  description: string | null;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <AlignLeft className="size-4" />
          Description
        </div>
        <Button variant="secondary" size="sm" className="cursor-pointer">
          Edit
        </Button>
      </div>
      {description ? (
        <div>
          <div
            className={cn(
              "text-[13.5px] leading-relaxed whitespace-pre-wrap text-slate-700",
              !expanded && "line-clamp-6",
            )}
          >
            {description}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 cursor-pointer gap-1 text-slate-600"
            onClick={onToggleExpanded}
          >
            <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
            {expanded ? "Show less" : "Show more"}
          </Button>
        </div>
      ) : (
        <button
          type="button"
          className="w-full cursor-pointer rounded-md bg-slate-100 px-3 py-2 text-left text-[13.5px] text-slate-500 hover:bg-slate-200"
        >
          Add a more detailed description…
        </button>
      )}
    </div>
  );
}
