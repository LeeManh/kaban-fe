"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  Check,
  Circle,
  MessageSquare,
  Paperclip,
  SquareCheckBig,
  SquarePen,
  TextAlignStart,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { useClickOutside } from "@/hooks/use-click-outside";
import type { CardLabel, CardSummary } from "@/lib/api/boards";
import { cn, toBackgroundStyle } from "@/lib/utils";

import { useUpdateCard } from "../_hooks/use-update-card";
import { DUE_STATUS_BADGE_CLASSNAME, getDueStatus } from "../_lib/due-status";
import { CardDetailDialog } from "./card-detail-dialog";
import { getLabelTooltipText, LabelSwatch } from "./label-swatch";

function DoneBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-4 items-center justify-center rounded-full bg-emerald-500",
        className,
      )}
    >
      <Check className="size-2.5 text-white" strokeWidth={3} />
    </span>
  );
}

function CardCover({ cover }: { cover: string }) {
  const isPhoto = cover.startsWith("http");

  return (
    <div
      style={{ background: toBackgroundStyle(cover) }}
      className={cn("-mx-2.5 -mt-2.5 mb-2 bg-cover bg-center", isPhoto ? "h-24" : "h-8")}
    />
  );
}

function CardLabels({ labels }: { labels: CardLabel[] }) {
  if (labels.length === 0) return null;

  return (
    <div className="mb-1.5 flex flex-wrap gap-1">
      {labels.map((label) => (
        <Tooltip key={label.id}>
          <TooltipTrigger render={<LabelSwatch label={label} showText={false} className="h-2 w-10 rounded-full" />} />
          <TooltipContent side="top" showArrow={false}>
            {getLabelTooltipText(label)}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function CardMeta({ card, isDone }: { card: CardSummary; isDone: boolean }) {
  const hasDescription = !!card.description;
  const hasChecklist = card.checklistProgress.total > 0;
  const commentCount = card._count.comments;
  const attachmentCount = card._count.attachments;
  const hasMeta =
    hasDescription || hasChecklist || commentCount > 0 || attachmentCount > 0 || !!card.dueDate;

  if (!hasMeta && card.assignees.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1 text-muted-foreground">
      {card.dueDate && (
        <span
          className={cn(
            "flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
            DUE_STATUS_BADGE_CLASSNAME[getDueStatus(card.dueDate, isDone)],
          )}
        >
          <Calendar className="size-3.5" />
          {new Date(card.dueDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
      )}
      {hasDescription && <TextAlignStart className="size-3.75" />}
      {hasChecklist && (
        <span className="flex items-center gap-1 text-xs font-medium">
          <SquareCheckBig className="size-3.75" />
          {card.checklistProgress.done}/{card.checklistProgress.total}
        </span>
      )}
      {commentCount > 0 && (
        <span className="flex items-center gap-1 text-xs font-medium">
          <MessageSquare className="size-3.75" />
          {commentCount}
        </span>
      )}
      {attachmentCount > 0 && (
        <span className="flex items-center gap-1 text-xs font-medium">
          <Paperclip className="size-3.75" />
          {attachmentCount}
        </span>
      )}

      {card.assignees.length > 0 && (
        <div className="ml-auto flex -space-x-1.5">
          {card.assignees.map((assignee) => (
            <UserAvatar
              key={assignee.id}
              user={assignee}
              className="size-5.5 ring-2 ring-white"
              fallbackClassName="text-[9px]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CardBody({
  card,
  checked,
  onToggleChecked,
}: {
  card: CardSummary;
  checked?: boolean;
  onToggleChecked?: () => void;
}) {
  const isDone = checked ?? card.isDone;

  return (
    <>
      {card.cover && <CardCover cover={card.cover} />}
      <CardLabels labels={card.labels} />

      <p className="flex items-center gap-2 text-[13.5px] leading-snug text-foreground">
        {onToggleChecked ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleChecked();
                  }}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center justify-center overflow-hidden transition-all duration-300",
                    isDone ? "size-4" : "w-0 group-hover:w-4",
                  )}
                />
              }
            >
              {isDone ? <DoneBadge /> : <Circle className="size-4 text-muted-foreground" />}
            </TooltipTrigger>
            <TooltipContent side="top" showArrow={false}>
              {isDone ? "Mark incomplete" : "Mark complete"}
            </TooltipContent>
          </Tooltip>
        ) : (
          isDone && <DoneBadge className="shrink-0" />
        )}
        <span>{card.title}</span>
      </p>

      <CardMeta card={card} isDone={isDone} />
    </>
  );
}

function CardEditView({
  card,
  onCancel,
  onSave,
  isSaving,
}: {
  card: CardSummary;
  onCancel: () => void;
  onSave: (title: string) => void;
  isSaving: boolean;
}) {
  const [title, setTitle] = useState(card.title);
  const rootRef = useClickOutside<HTMLDivElement>(onCancel);

  function submit() {
    const trimmed = title.trim();
    if (!trimmed || isSaving) return;
    onSave(trimmed);
  }

  return (
    <div ref={rootRef} onPointerDown={(e) => e.stopPropagation()} className="w-full">
      <div className="rounded-md border-2 border-transparent bg-card p-2.5 shadow-sm">
        <CardLabels labels={card.labels} />

        <Textarea
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
            if (e.key === "Escape") onCancel();
          }}
          className="resize-none border-none bg-transparent p-0 text-[13.5px] leading-snug text-foreground shadow-none focus-visible:ring-0 dark:bg-transparent"
        />

        <CardMeta card={card} isDone={card.isDone} />
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <Button size="sm" disabled={!title.trim() || isSaving} onClick={submit}>
          {isSaving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}

export function BoardCardItem({
  boardId,
  listTitle,
  card,
}: {
  boardId: string;
  listTitle: string;
  card: CardSummary;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", listId: card.listId },
  });
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const cardParamMatches = searchParams.get("card") === card.id;
  const [isDetailOpen, setIsDetailOpen] = useState(cardParamMatches);
  const [wasCardParamMatch, setWasCardParamMatch] = useState(cardParamMatches);
  const openedAtRef = useRef(0);
  const updateCard = useUpdateCard(boardId);

  if (cardParamMatches !== wasCardParamMatch) {
    setWasCardParamMatch(cardParamMatches);
    if (cardParamMatches) setIsDetailOpen(true);
  }

  useEffect(() => {
    if (isDetailOpen) openedAtRef.current = Date.now();
  }, [isDetailOpen]);

  function handleDetailOpenChange(open: boolean) {
    if (!open && Date.now() - openedAtRef.current < 400) return;
    setIsDetailOpen(open);
    const params = new URLSearchParams(searchParams.toString());
    if (open) {
      params.set("card", card.id);
    } else if (params.get("card") === card.id) {
      params.delete("card");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...(isEditing ? {} : attributes)}
      {...(isEditing ? {} : listeners)}
      onClick={() => {
        if (!isEditing && !isDragging) handleDetailOpenChange(true);
      }}
      className={
        isEditing
          ? "relative z-50 w-full"
          : cn(
              "group relative overflow-hidden rounded-md border-2 p-2.5 transition-shadow",
              isDragging
                ? "border-dashed border-muted-foreground/30 bg-muted-foreground/5"
                : "cursor-pointer border-transparent bg-card shadow-sm hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
            )
      }
    >
      {isEditing ? (
        <>
          {createPortal(<div className="fixed inset-0 z-40 bg-black/50" />, document.body)}
          <CardEditView
            card={card}
            isSaving={updateCard.isPending}
            onCancel={() => setIsEditing(false)}
            onSave={(title) => {
              updateCard.mutate(
                { cardId: card.id, version: card.version, title },
                { onSuccess: () => setIsEditing(false) },
              );
            }}
          />
        </>
      ) : (
        <div className={cn(isDragging && "invisible")}>
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label="Edit card"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="absolute top-1.5 right-1.5 hidden size-6 items-center justify-center rounded-md bg-card text-muted-foreground shadow-sm group-hover:flex hover:bg-accent"
                />
              }
            >
              <SquarePen className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent side="top" showArrow={false}>
              Edit card
            </TooltipContent>
          </Tooltip>
          <CardBody
            card={card}
            onToggleChecked={() =>
              updateCard.mutate({ cardId: card.id, version: card.version, isDone: !card.isDone })
            }
          />
        </div>
      )}

      <CardDetailDialog
        open={isDetailOpen}
        onOpenChange={handleDetailOpenChange}
        boardId={boardId}
        card={card}
        listTitle={listTitle}
      />
    </div>
  );
}

export function BoardCardPreview({ card }: { card: CardSummary }) {
  return (
    <div className="cursor-grabbing overflow-hidden rounded-md bg-card p-2.5 shadow-lg">
      <CardBody card={card} />
    </div>
  );
}
