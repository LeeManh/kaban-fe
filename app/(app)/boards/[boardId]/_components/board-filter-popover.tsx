"use client";

import { Calendar, CircleUserRound, Clock, ListFilter, Tag, User, X } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BoardMember, CardLabel } from "@/lib/api/boards";
import { getCurrentUserId } from "@/lib/api/tokens";
import { cn, getInitials } from "@/lib/utils";

import {
  EMPTY_BOARD_FILTER,
  isBoardFilterActive,
  type BoardFilterState,
} from "../_lib/board-filter";
import { getLabelTooltipText, LabelSwatch } from "./label-swatch";

function FilterRow({
  icon,
  label,
  checked,
  onCheckedChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-accent">
      <Checkbox checked={checked} onCheckedChange={(value) => onCheckedChange(!!value)} />
      {icon}
      <span className="text-[13.5px] text-foreground">{label}</span>
    </label>
  );
}

export function BoardFilterPopover({
  filter,
  onFilterChange,
  members,
  labels,
}: {
  filter: BoardFilterState;
  onFilterChange: (next: BoardFilterState) => void;
  members: BoardMember[];
  labels: CardLabel[];
}) {
  const [memberSearch, setMemberSearch] = useState("");
  const [membersOpen, setMembersOpen] = useState(false);
  const [labelSearch, setLabelSearch] = useState("");
  const [labelsOpen, setLabelsOpen] = useState(false);

  const currentUserId = getCurrentUserId();
  const currentMember = members.find((member) => member.id === currentUserId);
  const selectableMembers = members.filter((member) => member.id !== currentUserId);
  const filteredMembers = selectableMembers.filter((member) =>
    (member.name ?? member.email).toLowerCase().includes(memberSearch.trim().toLowerCase()),
  );
  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(labelSearch.trim().toLowerCase()),
  );

  function set<K extends keyof BoardFilterState>(key: K, value: BoardFilterState[K]) {
    onFilterChange({ ...filter, [key]: value });
  }

  function toggleMemberId(memberId: string) {
    const next = filter.memberIds.includes(memberId)
      ? filter.memberIds.filter((id) => id !== memberId)
      : [...filter.memberIds, memberId];
    set("memberIds", next);
  }

  function toggleLabelId(labelId: string) {
    const next = filter.labelIds.includes(labelId)
      ? filter.labelIds.filter((id) => id !== labelId)
      : [...filter.labelIds, labelId];
    set("labelIds", next);
  }

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="Filter"
                  className={cn(
                    "flex size-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15",
                    isBoardFilterActive(filter) && "bg-white/20",
                  )}
                />
              }
            />
          }
        >
          <ListFilter className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          Filter
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="end" className="max-h-[80vh] w-80 gap-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <PopoverTitle className="mx-auto text-sm font-semibold text-foreground">
            Filter
          </PopoverTitle>
          <PopoverClose
            render={<button type="button" aria-label="Close" className="cursor-pointer" />}
          >
            <X className="size-3.5" />
          </PopoverClose>
        </div>

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Keyword</div>
          <Input
            value={filter.keyword}
            onChange={(e) => set("keyword", e.target.value)}
            placeholder="Enter a keyword…"
          />
          <p className="mt-1 text-xs text-muted-foreground">Search cards, members, labels, and more.</p>
        </div>

        {isBoardFilterActive(filter) && (
          <button
            type="button"
            onClick={() => onFilterChange(EMPTY_BOARD_FILTER)}
            className="cursor-pointer self-start text-xs font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        )}

        <div>
          <div className="mb-1 text-xs font-semibold text-foreground">Members</div>
          <div className="flex flex-col">
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="size-3.5" />
                </span>
              }
              label="No members"
              checked={filter.noMembers}
              onCheckedChange={(v) => set("noMembers", v)}
            />
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                  {currentMember ? (
                    getInitials(currentMember)
                  ) : (
                    <CircleUserRound className="size-3.5" />
                  )}
                </span>
              }
              label="Cards assigned to me"
              checked={filter.assignedToMe}
              onCheckedChange={(v) => set("assignedToMe", v)}
            />
            <div className="flex items-center gap-2.5 px-1.5 py-1">
              <Checkbox
                checked={filter.memberIds.length > 0}
                onCheckedChange={(v) =>
                  set("memberIds", v ? selectableMembers.map((member) => member.id) : [])
                }
              />
              <Popover
                open={membersOpen}
                onOpenChange={(open) => {
                  setMembersOpen(open);
                  if (!open) setMemberSearch("");
                }}
              >
                <PopoverTrigger
                  nativeButton={false}
                  render={
                    <Input
                      value={memberSearch}
                      onChange={(e) => {
                        setMemberSearch(e.target.value);
                        setMembersOpen(true);
                      }}
                      placeholder={
                        filter.memberIds.length > 0
                          ? `${filter.memberIds.length} member${filter.memberIds.length > 1 ? "s" : ""} selected`
                          : "Select members"
                      }
                      className="flex-1"
                    />
                  }
                />
                <PopoverContent
                  align="start"
                  initialFocus={false}
                  className="max-h-64 w-64 gap-0.5 overflow-y-auto p-1"
                >
                  {filteredMembers.length === 0 ? (
                    <p className="px-1.5 py-2 text-center text-[13px] text-muted-foreground">
                      No members found
                    </p>
                  ) : (
                    filteredMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleMemberId(member.id)}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-accent"
                      >
                        <Checkbox checked={filter.memberIds.includes(member.id)} />
                        <span className="flex size-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                          {getInitials(member)}
                        </span>
                        <span className="truncate text-[13.5px] text-foreground">
                          {member.name ?? member.email}
                        </span>
                      </button>
                    ))
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold text-foreground">Card status</div>
          <div className="flex flex-col">
            <FilterRow
              icon={<span className="size-6" />}
              label="Marked as complete"
              checked={filter.markedComplete}
              onCheckedChange={(v) => set("markedComplete", v)}
            />
            <FilterRow
              icon={<span className="size-6" />}
              label="Not marked as complete"
              checked={filter.notMarkedComplete}
              onCheckedChange={(v) => set("notMarkedComplete", v)}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold text-foreground">Due date</div>
          <div className="flex flex-col">
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Calendar className="size-3.5" />
                </span>
              }
              label="No dates"
              checked={filter.noDates}
              onCheckedChange={(v) => set("noDates", v)}
            />
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-red-600 text-white">
                  <Clock className="size-3.5" />
                </span>
              }
              label="Overdue"
              checked={filter.overdue}
              onCheckedChange={(v) => set("overdue", v)}
            />
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-amber-400 text-amber-950">
                  <Clock className="size-3.5" />
                </span>
              }
              label="Due in the next day"
              checked={filter.dueNextDay}
              onCheckedChange={(v) => set("dueNextDay", v)}
            />
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Clock className="size-3.5" />
                </span>
              }
              label="Due in the next week"
              checked={filter.dueNextWeek}
              onCheckedChange={(v) => set("dueNextWeek", v)}
            />
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Clock className="size-3.5" />
                </span>
              }
              label="Due in the next month"
              checked={filter.dueNextMonth}
              onCheckedChange={(v) => set("dueNextMonth", v)}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold text-foreground">Labels</div>
          <div className="flex flex-col">
            <FilterRow
              icon={
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Tag className="size-3.5" />
                </span>
              }
              label="No labels"
              checked={filter.noLabels}
              onCheckedChange={(v) => set("noLabels", v)}
            />
            {labels.slice(0, 3).map((label) => (
              <label
                key={label.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-accent"
              >
                <Checkbox
                  checked={filter.labelIds.includes(label.id)}
                  onCheckedChange={() => toggleLabelId(label.id)}
                />
                <Tooltip>
                  <TooltipTrigger
                    render={<LabelSwatch label={label} className="h-6 flex-1 truncate px-2 text-[12.5px]" />}
                  />
                  <TooltipContent side="top" showArrow={false}>
                    {getLabelTooltipText(label)}
                  </TooltipContent>
                </Tooltip>
              </label>
            ))}
            <div className="flex items-center gap-2.5 px-1.5 py-1">
              <Checkbox
                checked={filter.labelIds.length > 0}
                onCheckedChange={(v) => set("labelIds", v ? labels.map((label) => label.id) : [])}
              />
              <Popover
                open={labelsOpen}
                onOpenChange={(open) => {
                  setLabelsOpen(open);
                  if (!open) setLabelSearch("");
                }}
              >
                <PopoverTrigger
                  nativeButton={false}
                  render={
                    <Input
                      value={labelSearch}
                      onChange={(e) => {
                        setLabelSearch(e.target.value);
                        setLabelsOpen(true);
                      }}
                      placeholder={
                        filter.labelIds.length > 0
                          ? `${filter.labelIds.length} label${filter.labelIds.length > 1 ? "s" : ""} selected`
                          : "Select labels"
                      }
                      className="flex-1"
                    />
                  }
                />
                <PopoverContent
                  align="start"
                  initialFocus={false}
                  className="max-h-64 w-64 gap-0.5 overflow-y-auto p-1"
                >
                  {filteredLabels.length === 0 ? (
                    <p className="px-1.5 py-2 text-center text-[13px] text-muted-foreground">
                      No labels found
                    </p>
                  ) : (
                    filteredLabels.map((label) => (
                      <button
                        key={label.id}
                        type="button"
                        onClick={() => toggleLabelId(label.id)}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-accent"
                      >
                        <Checkbox checked={filter.labelIds.includes(label.id)} />
                        <Tooltip>
                          <TooltipTrigger
                            render={<LabelSwatch label={label} className="h-6 flex-1 truncate px-2 text-[12.5px]" />}
                          />
                          <TooltipContent side="top" showArrow={false}>
                            {getLabelTooltipText(label)}
                          </TooltipContent>
                        </Tooltip>
                      </button>
                    ))
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
