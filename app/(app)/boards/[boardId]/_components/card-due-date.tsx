"use client";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function CardDueDate({ dueDate, isOverdue }: { dueDate: string; isOverdue: boolean }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-slate-500">Due date</div>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-[13px] font-medium text-slate-700 hover:bg-slate-200"
      >
        {new Date(dueDate).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
        {isOverdue && (
          <Badge variant="destructive" className="bg-red-600 text-white">
            Overdue
          </Badge>
        )}
        <ChevronDown className="size-3.5" />
      </button>
    </div>
  );
}
