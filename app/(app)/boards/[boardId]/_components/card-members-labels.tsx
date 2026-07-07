"use client";

import { Plus, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CardAssignee, CardLabel } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

export function CardMembersLabels({
  assignees,
  labels,
}: {
  assignees: CardAssignee[];
  labels: CardLabel[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-500">Members</div>
        <div className="flex items-center gap-1">
          {assignees.map((assignee) => (
            <Avatar key={assignee.id} className="size-7">
              <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
                {getInitials(assignee)}
              </AvatarFallback>
            </Avatar>
          ))}
          <button
            type="button"
            aria-label="Add member"
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-100"
          >
            <UserPlus className="size-3.5" />
          </button>
        </div>
      </div>

      {labels.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-500">Labels</div>
          <div className="flex flex-wrap items-center gap-1.5">
            {labels.map((label) => (
              <span
                key={label.id}
                style={{ backgroundColor: label.color }}
                className="flex h-6 min-w-10 items-center justify-center rounded-md px-2.5 text-[13px] font-medium text-white"
              >
                {label.name}
              </span>
            ))}
            <button
              type="button"
              aria-label="Add label"
              className="flex h-7 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
