"use client";

import { CheckSquare, Clock, Paperclip, Plus, Tag, UserPlus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CardAssignee, CardLabel } from "@/lib/api/boards";

import { CardAttachFilePopoverContent } from "./card-attach-file-popover";
import { CardChecklistPopoverContent } from "./card-checklist-popover";
import { CardDueDatePopoverContent } from "./card-due-date-popover";
import { CardLabelsPopoverContent } from "./card-labels-popover";
import { CardMembersPopoverContent } from "./card-members-popover";

const ADD_TO_CARD_ITEMS = [
  { icon: Tag, title: "Labels", description: "Organize, categorize, and prioritize" },
  { icon: Clock, title: "Dates", description: "Due dates and reminders" },
  { icon: CheckSquare, title: "Checklist", description: "Add subtasks" },
  { icon: UserPlus, title: "Members", description: "Assign members" },
  { icon: Paperclip, title: "Attachment", description: "Attach files to this card" },
];

function AddToCardButton({
  boardId,
  cardId,
  version,
  dueDate,
  reminderOffsetMinutes,
  labels,
  assignees,
}: {
  boardId: string;
  cardId: string;
  version: number;
  dueDate: string | null;
  reminderOffsetMinutes: number | null;
  labels: CardLabel[];
  assignees: CardAssignee[];
}) {
  const [view, setView] = useState<
    "menu" | "labels" | "members" | "dates" | "checklist" | "attachment"
  >("menu");

  const VIEW_BY_TITLE: Partial<Record<string, typeof view>> = {
    Labels: "labels",
    Members: "members",
    Dates: "dates",
    Checklist: "checklist",
    Attachment: "attachment",
  };

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) setView("menu");
      }}
    >
      <PopoverTrigger
        render={<Button variant="outline" size="sm" className="shrink-0 cursor-pointer gap-1.5" />}
      >
        <Plus className="size-3.5" />
        Add
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 gap-1">
        {view === "labels" && (
          <CardLabelsPopoverContent boardId={boardId} cardId={cardId} cardLabels={labels} />
        )}
        {view === "members" && (
          <CardMembersPopoverContent boardId={boardId} cardId={cardId} assignees={assignees} />
        )}
        {view === "dates" && (
          <CardDueDatePopoverContent
            boardId={boardId}
            cardId={cardId}
            version={version}
            dueDate={dueDate}
            reminderOffsetMinutes={reminderOffsetMinutes}
          />
        )}
        {view === "checklist" && (
          <CardChecklistPopoverContent boardId={boardId} cardId={cardId} />
        )}
        {view === "attachment" && (
          <CardAttachFilePopoverContent boardId={boardId} cardId={cardId} />
        )}
        {view === "menu" && (
          <>
            <div className="flex items-center justify-between px-1">
              <span className="w-6" />
              <PopoverTitle className="flex-1 text-center text-sm font-semibold text-slate-900">
                Add to card
              </PopoverTitle>
              <PopoverClose
                render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}
              >
                <X className="size-3.5" />
                <span className="sr-only">Close</span>
              </PopoverClose>
            </div>
            <div className="flex flex-col">
              {ADD_TO_CARD_ITEMS.map(({ icon: Icon, title, description }) => {
                const targetView = VIEW_BY_TITLE[title];
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={targetView ? () => setView(targetView) : undefined}
                    className="flex cursor-pointer items-start gap-3 rounded-md p-2 text-left hover:bg-slate-100"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-slate-600" />
                    <div>
                      <div className="text-[13.5px] font-medium text-slate-800">{title}</div>
                      <div className="text-xs text-slate-500">{description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function CardQuickActions({
  boardId,
  cardId,
  version,
  dueDate,
  reminderOffsetMinutes,
  labels,
  assignees,
}: {
  boardId: string;
  cardId: string;
  version: number;
  dueDate: string | null;
  reminderOffsetMinutes: number | null;
  labels: CardLabel[];
  assignees: CardAssignee[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <AddToCardButton
        boardId={boardId}
        cardId={cardId}
        version={version}
        dueDate={dueDate}
        reminderOffsetMinutes={reminderOffsetMinutes}
        labels={labels}
        assignees={assignees}
      />
      {labels.length === 0 && (
        <Popover>
          <PopoverTrigger
            render={<Button variant="outline" size="sm" className="cursor-pointer gap-1.5" />}
          >
            <Tag className="size-3.5" />
            Labels
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 gap-2">
            <CardLabelsPopoverContent boardId={boardId} cardId={cardId} cardLabels={labels} />
          </PopoverContent>
        </Popover>
      )}
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" size="sm" className="cursor-pointer gap-1.5" />}
        >
          <CheckSquare className="size-3.5" />
          Checklist
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 gap-2">
          <CardChecklistPopoverContent boardId={boardId} cardId={cardId} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" size="sm" className="cursor-pointer gap-1.5" />}
        >
          <Paperclip className="size-3.5" />
          Attachment
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 gap-3">
          <CardAttachFilePopoverContent boardId={boardId} cardId={cardId} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
