"use client";

import { useState } from "react";
import {
  AlignLeft,
  Check,
  CheckSquare,
  ChevronDown,
  Clock,
  Ellipsis,
  ExternalLink,
  Eye,
  ImageIcon,
  Link2,
  MessageSquare,
  Paperclip,
  Plus,
  Tag,
  UserPlus,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CardSummary } from "@/lib/api/boards";
import { cn, getInitials, toBackgroundStyle } from "@/lib/utils";

import { CardCoverPopover } from "./card-cover-popover";

const DEFAULT_COVER = "linear-gradient(to bottom right, #8b5cf6, #e879f9)";

interface MockChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

const INITIAL_CHECKLIST_ITEMS: MockChecklistItem[] = [
  { id: "1", text: "hhe", done: false },
  { id: "2", text: "abc", done: false },
];

interface MockAttachment {
  id: string;
  name: string;
  addedAt: string;
  isCover?: boolean;
  color: string;
}

const MOCK_ATTACHMENTS: MockAttachment[] = [
  { id: "1", name: "tiktok-image (3).jpg", addedAt: "Added 7 hours ago", color: "bg-slate-400" },
  {
    id: "2",
    name: "Organize your work.jpg",
    addedAt: "Added Feb 7, 2026, 5:58 AM",
    isCover: true,
    color: "bg-linear-to-br from-violet-400 to-sky-300",
  },
];

interface MockComment {
  id: string;
  authorName: string;
  authorInitials: string;
  timeAgo: string;
  text: string;
}

const MOCK_COMMENTS: MockComment[] = [
  { id: "1", authorName: "LeeManh", authorInitials: "LM", timeAgo: "7 hours ago", text: "hehe" },
];

export function CardDetailDialog({
  open,
  onOpenChange,
  card,
  listTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: CardSummary;
  listTitle: string;
}) {
  const [isDone, setIsDone] = useState(card.isDone);
  const [checklistItems, setChecklistItems] = useState(INITIAL_CHECKLIST_ITEMS);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [coverBackground, setCoverBackground] = useState(DEFAULT_COVER);

  const doneCount = checklistItems.filter((item) => item.done).length;
  const checklistPercent =
    checklistItems.length > 0 ? Math.round((doneCount / checklistItems.length) * 100) : 0;
  const isOverdue = !!card.dueDate && !isDone && new Date(card.dueDate) < new Date();

  function toggleChecklistItem(id: string) {
    setChecklistItems((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  function addChecklistItem() {
    const trimmed = newItemText.trim();
    if (!trimmed) return;
    setChecklistItems((items) => [
      ...items,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ]);
    setNewItemText("");
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-5xl">
          <div
            style={{ background: toBackgroundStyle(coverBackground) }}
            className="group relative h-40 shrink-0 bg-cover bg-center"
          >
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-3 left-3 cursor-pointer gap-1 bg-white/90 text-slate-800 hover:bg-white"
            >
              {listTitle}
              <ChevronDown className="size-3.5" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCoverBackground(DEFAULT_COVER)}
              className="absolute right-3 bottom-3 cursor-pointer bg-white/90 text-slate-800 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-white"
            >
              Remove cover
            </Button>

            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <CardCoverPopover value={coverBackground} onChange={setCoverBackground} />
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label="Stop watching card"
                      className="cursor-pointer rounded-full bg-white/90 hover:bg-white"
                    />
                  }
                >
                  <Eye className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="bottom" showArrow={false}>
                  Stop watching card
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label="More options"
                      className="cursor-pointer rounded-full bg-white/90 hover:bg-white"
                    />
                  }
                >
                  <Ellipsis className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="bottom" showArrow={false}>
                  More options
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <DialogClose
                      render={
                        <Button
                          variant="secondary"
                          size="icon-sm"
                          aria-label="Close"
                          className="cursor-pointer rounded-full bg-white/90 hover:bg-white"
                        />
                      }
                    >
                      <X className="size-4" />
                    </DialogClose>
                  }
                />
                <TooltipContent side="bottom" showArrow={false}>
                  Close
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="grid max-h-[75vh] grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_400px]">
            <div className="flex flex-col gap-5 p-5 md:border-r md:border-slate-200">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setIsDone((v) => !v)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className="mt-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-slate-300 hover:border-emerald-500"
                >
                  {isDone && <Check className="size-4 text-emerald-600" />}
                </button>
                <h2 className="text-xl leading-snug font-semibold text-slate-900">{card.title}</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer gap-1.5">
                  <Plus className="size-3.5" />
                  Add
                </Button>
                {card.labels.length === 0 && (
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-1.5 text-xs font-semibold text-slate-500">Members</div>
                  <div className="flex items-center gap-1">
                    {card.assignees.map((assignee) => (
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

                {card.labels.length > 0 && (
                  <div>
                    <div className="mb-1.5 text-xs font-semibold text-slate-500">Labels</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {card.labels.map((label) => (
                        <span
                          key={label.id}
                          style={{ backgroundColor: label.color }}
                          className="flex h-7 min-w-10 items-center justify-center rounded-md px-2.5 text-[13px] font-medium text-white font-medium"
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

              {card.dueDate && (
                <div>
                  <div className="mb-1.5 text-xs font-semibold text-slate-500">Due date</div>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-[13px] font-medium text-slate-700 hover:bg-slate-200"
                  >
                    {new Date(card.dueDate).toLocaleString(undefined, {
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
              )}

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
                {card.description ? (
                  <div>
                    <div
                      className={cn(
                        "text-[13.5px] leading-relaxed whitespace-pre-wrap text-slate-700",
                        !descriptionExpanded && "line-clamp-6",
                      )}
                    >
                      {card.description}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 cursor-pointer gap-1 text-slate-600"
                      onClick={() => setDescriptionExpanded((v) => !v)}
                    >
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          descriptionExpanded && "rotate-180",
                        )}
                      />
                      {descriptionExpanded ? "Show less" : "Show more"}
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

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Paperclip className="size-4" />
                    Attachments
                  </div>
                  <Button variant="secondary" size="sm" className="cursor-pointer">
                    Add
                  </Button>
                </div>
                <div className="mb-1.5 text-xs font-semibold text-slate-500">Files</div>
                <div className="flex flex-col gap-1">
                  {MOCK_ATTACHMENTS.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 rounded-md p-1.5 hover:bg-slate-100"
                    >
                      <div className={cn("h-11 w-16 shrink-0 rounded-sm", attachment.color)} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-medium text-slate-800">
                          {attachment.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          {attachment.addedAt}
                          {attachment.isCover && (
                            <>
                              <span>·</span>
                              <ImageIcon className="size-3" />
                              Cover
                            </>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Open attachment"
                        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
                      >
                        <ExternalLink className="size-3.75" />
                      </button>
                      <button
                        type="button"
                        aria-label="Attachment actions"
                        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
                      >
                        <Ellipsis className="size-3.75" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckSquare className="size-4" />
                    Checklist
                  </div>
                  <Button variant="secondary" size="sm" className="cursor-pointer">
                    Delete
                  </Button>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">{checklistPercent}%</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${checklistPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-slate-100"
                    >
                      <Checkbox
                        checked={item.done}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                      />
                      <span
                        className={cn(
                          "flex-1 text-[13.5px] text-slate-700",
                          item.done && "text-slate-400 line-through",
                        )}
                      >
                        {item.text}
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

                {isAddingItem ? (
                  <div className="mt-1.5 flex flex-col gap-2">
                    <Input
                      autoFocus
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addChecklistItem();
                        }
                        if (e.key === "Escape") setIsAddingItem(false);
                      }}
                      placeholder="Add an item"
                    />
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        disabled={!newItemText.trim()}
                        onClick={addChecklistItem}
                      >
                        Add
                      </Button>
                      <button
                        type="button"
                        onClick={() => setIsAddingItem(false)}
                        className="cursor-pointer text-[13px] font-medium text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                      <span className="ml-2 flex items-center gap-1 text-[13px] font-medium text-slate-500">
                        <UserPlus className="size-3.5" />
                        Assign
                      </span>
                      <span className="flex items-center gap-1 text-[13px] font-medium text-slate-500">
                        <Clock className="size-3.5" />
                        Due date
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingItem(true)}
                    className="mt-1.5 flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-slate-500 hover:bg-slate-200"
                  >
                    <Plus className="size-3.75" />
                    Add an item
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MessageSquare className="size-4" />
                  Comments and activity
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Show details
                </Button>
              </div>

              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment…"
              />

              <div className="flex flex-col gap-3">
                {MOCK_COMMENTS.map((comment) => (
                  <div key={comment.id} className="flex gap-2.5">
                    <Avatar className="size-7 shrink-0">
                      <AvatarFallback className="bg-amber-500 text-[11px] font-bold text-white">
                        {comment.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <span className="font-semibold text-slate-800">{comment.authorName}</span>
                        <span className="text-slate-500">{comment.timeAgo}</span>
                        <Link2 className="size-3 text-slate-400" />
                      </div>
                      <div className="mt-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[13.5px] text-slate-700">
                        {comment.text}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                        <button type="button" className="cursor-pointer hover:underline">
                          Edit
                        </button>
                        <span>·</span>
                        <button type="button" className="cursor-pointer hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
