"use client";

import { ChevronLeft, Ellipsis, Lock, Share2, Trash2, UserPlus, UserX, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CardAssignee } from "@/lib/api/boards";
import { getCurrentUserId } from "@/lib/api/tokens";
import { cn } from "@/lib/utils";

import { useAssignCardMember, useUnassignCardMember } from "../_hooks/use-card-members";
import { useDeleteCard } from "../_hooks/use-delete-card";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleCopy}
      className="w-full cursor-pointer truncate rounded-md bg-muted px-2.5 py-2 text-left text-sm text-foreground hover:bg-accent"
    >
      {copied ? "Copied to clipboard!" : value}
    </button>
  );
}

export function CardMoreOptionsMenu({
  boardId,
  cardId,
  assignees,
  buttonClassName,
  onDeleted,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
  buttonClassName: string;
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"menu" | "share" | "delete">("menu");

  const currentUserId = getCurrentUserId();
  const isJoined = assignees.some((assignee) => assignee.id === currentUserId);

  const assignCardMember = useAssignCardMember(boardId);
  const unassignCardMember = useUnassignCardMember(boardId);
  const isTogglingMembership = assignCardMember.isPending || unassignCardMember.isPending;
  const deleteCard = useDeleteCard(boardId);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setView("menu");
  }

  function handleToggleMembership() {
    if (!currentUserId) return;
    if (isJoined) {
      unassignCardMember.mutate({ cardId, userId: currentUserId });
    } else {
      assignCardMember.mutate({ cardId, userId: currentUserId });
    }
  }

  function handleDelete() {
    deleteCard.mutate(cardId, {
      onSuccess: () => {
        handleOpenChange(false);
        onDeleted();
      },
    });
  }

  const cardUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/boards/${boardId}?card=${cardId}`;

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label="More options"
                  className={buttonClassName}
                />
              }
            />
          }
        >
          <Ellipsis className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          More options
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="end"
        className={cn(view === "menu" ? "w-52" : "w-72", "gap-1")}
      >
        {view === "menu" && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={isTogglingMembership}
              onClick={handleToggleMembership}
            >
              {isJoined ? <UserX className="size-4" /> : <UserPlus className="size-4" />}
              {isJoined ? "Leave" : "Join"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" closeOnClick={false} onClick={() => setView("share")}>
              <Share2 className="size-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              closeOnClick={false}
              onClick={() => setView("delete")}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}

        {view === "share" && (
          <div className="space-y-3 p-1">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Back"
                className="cursor-pointer"
                onClick={() => setView("menu")}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="flex-1 text-center text-sm font-semibold text-foreground">
                Share and more…
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Close"
                className="cursor-pointer"
                onClick={() => handleOpenChange(false)}
              >
                <X className="size-3.5" />
              </Button>
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                Link to this card
                <Lock className="size-3" />
              </div>
              <CopyField label="Copy link to this card" value={cardUrl} />
            </div>
          </div>
        )}

        {view === "delete" && (
          <div className="space-y-3 p-1">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Back"
                className="cursor-pointer"
                onClick={() => setView("menu")}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="flex-1 text-center text-sm font-semibold text-foreground">
                Delete card?
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Close"
                className="cursor-pointer"
                onClick={() => handleOpenChange(false)}
              >
                <X className="size-3.5" />
              </Button>
            </div>

            <p className="px-1 text-[13px] text-muted-foreground">
              Deleting a card is permanent and cannot be undone.
            </p>

            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              disabled={deleteCard.isPending}
              onClick={handleDelete}
            >
              {deleteCard.isPending ? "Deleting…" : "Delete card"}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
