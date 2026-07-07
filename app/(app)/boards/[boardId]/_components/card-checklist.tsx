"use client";

import { CheckSquare, Clock, Ellipsis, Plus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Checklist } from "@/lib/api/cards";
import { cn } from "@/lib/utils";

export function CardChecklist({ checklist }: { checklist: Checklist }) {
  const doneCount = checklist.items.filter((item) => item.isDone).length;
  const percent =
    checklist.items.length > 0 ? Math.round((doneCount / checklist.items.length) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CheckSquare className="size-4" />
          {checklist.title}
        </div>
        <Button variant="secondary" size="sm" className="cursor-pointer">
          Delete
        </Button>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">{percent}%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {checklist.items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-slate-100"
          >
            <Checkbox checked={item.isDone} />
            <span
              className={cn(
                "flex-1 text-[13.5px] text-slate-700",
                item.isDone && "text-slate-400 line-through",
              )}
            >
              {item.content}
            </span>
            <div className="hidden items-center gap-1 group-hover:flex">
              <button
                type="button"
                aria-label="Due date"
                className="flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
              >
                <Clock className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Assign"
                className="flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
              >
                <UserPlus className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Item actions"
                className="flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
              >
                <Ellipsis className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-1.5 flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-slate-500 hover:bg-slate-200"
      >
        <Plus className="size-3.75" />
        Add an item
      </button>
    </div>
  );
}
