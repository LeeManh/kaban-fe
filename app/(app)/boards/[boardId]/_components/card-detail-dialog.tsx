"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { CardSummary } from "@/lib/api/boards";

import { useCard } from "../_hooks/use-card";
import { CardAttachments } from "./card-attachments";
import { CardChecklist } from "./card-checklist";
import { CardComments } from "./card-comments";
import { CardCoverBanner } from "./card-cover-banner";
import { CardDescription } from "./card-description";
import { CardDueDate } from "./card-due-date";
import { CardMembersLabels } from "./card-members-labels";
import { CardQuickActions } from "./card-quick-actions";
import { CardTitle } from "./card-title";

const DEFAULT_COVER = "linear-gradient(to bottom right, #8b5cf6, #e879f9)";

export function CardDetailDialog({
  open,
  onOpenChange,
  boardId,
  card,
  listTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
  card: CardSummary;
  listTitle: string;
}) {
  const [isDone, setIsDone] = useState(card.isDone);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [coverBackground, setCoverBackground] = useState(DEFAULT_COVER);

  const { data: detail } = useCard(boardId, card.id, { enabled: open });
  const checklist = detail?.checklists[0];
  const attachments = detail?.attachments ?? [];
  const comments = detail?.comments ?? [];

  const isOverdue = !!card.dueDate && !isDone && new Date(card.dueDate) < new Date();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-5xl">
          <CardCoverBanner
            listTitle={listTitle}
            coverBackground={coverBackground}
            onCoverChange={setCoverBackground}
            onRemoveCover={() => setCoverBackground(DEFAULT_COVER)}
          />

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_400px]">
            <div className="flex max-h-[75vh] flex-col gap-5 overflow-y-auto p-5 md:border-r md:border-slate-200">
              <CardTitle title={card.title} isDone={isDone} onToggleDone={() => setIsDone((v) => !v)} />

              <CardQuickActions hasLabels={card.labels.length > 0} />

              <CardMembersLabels assignees={card.assignees} labels={card.labels} />

              {card.dueDate && <CardDueDate dueDate={card.dueDate} isOverdue={isOverdue} />}

              <CardDescription
                description={card.description}
                expanded={descriptionExpanded}
                onToggleExpanded={() => setDescriptionExpanded((v) => !v)}
              />

              <CardAttachments attachments={attachments} />

              {checklist && <CardChecklist checklist={checklist} />}
            </div>

            <CardComments
              comments={comments}
              commentText={commentText}
              onCommentTextChange={setCommentText}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
