"use client";

import { CheckSquare, Clock, Paperclip, Plus, Tag, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const ADD_TO_CARD_ITEMS = [
  { icon: Tag, title: "Labels", description: "Organize, categorize, and prioritize" },
  { icon: Clock, title: "Dates", description: "Start dates, due dates, and reminders" },
  { icon: CheckSquare, title: "Checklist", description: "Add subtasks" },
  { icon: UserPlus, title: "Members", description: "Assign members" },
  { icon: Paperclip, title: "Attachment", description: "Add links, pages, work items, and more" },
];

function AddToCardButton() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="shrink-0 cursor-pointer gap-1.5" />}
      >
        <Plus className="size-3.5" />
        Add
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 gap-1">
        <div className="flex items-center justify-between px-1">
          <span className="w-6" />
          <PopoverTitle className="flex-1 text-center text-sm font-semibold text-slate-900">
            Add to card
          </PopoverTitle>
          <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>
        <div className="flex flex-col">
          {ADD_TO_CARD_ITEMS.map(({ icon: Icon, title, description }) => (
            <button
              key={title}
              type="button"
              className="flex cursor-pointer items-start gap-3 rounded-md p-2 text-left hover:bg-slate-100"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-slate-600" />
              <div>
                <div className="text-[13.5px] font-medium text-slate-800">{title}</div>
                <div className="text-xs text-slate-500">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function CardQuickActions({ hasLabels }: { hasLabels: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      <AddToCardButton />
      {!hasLabels && (
        <Button variant="outline" size="sm" className="cursor-pointer gap-1.5">
          <Tag className="size-3.5" />
          Labels
        </Button>
      )}
      <Button variant="outline" size="sm" className="cursor-pointer gap-1.5">
        <CheckSquare className="size-3.5" />
        Checklist
      </Button>
      <Button variant="outline" size="sm" className="cursor-pointer gap-1.5">
        <Paperclip className="size-3.5" />
        Attachment
      </Button>
    </div>
  );
}
