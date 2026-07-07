"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { CardSummary } from "@/lib/api/boards";

import { useCard } from "../_hooks/use-card";
import { useUpdateCard } from "../_hooks/use-update-card";
import { useUpdateCardCover } from "../_hooks/use-update-card-cover";
import { CardAttachments } from "./card-attachments";
import { CardChecklist } from "./card-checklist";
import { CardComments } from "./card-comments";
import { CardCoverBanner } from "./card-cover-banner";
import { CardDescription } from "./card-description";
import { CardDueDate } from "./card-due-date";
import { CardLabels } from "./card-labels";
import { CardMembers } from "./card-members";
import { CardQuickActions } from "./card-quick-actions";
import { CardTitle } from "./card-title";

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
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { data: detail } = useCard(boardId, card.id, { enabled: open });
  const checklist = detail?.checklists[0];
  const attachments = detail?.attachments ?? [];
  const comments = detail?.comments ?? [];

  const updateCard = useUpdateCard(boardId);
  const updateCardCover = useUpdateCardCover(boardId);

  const isOverdue = !!card.dueDate && !card.isDone && new Date(card.dueDate) < new Date();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-5xl">
          <CardCoverBanner
            listTitle={listTitle}
            cover={card.cover}
            onCoverChange={(cover) =>
              updateCardCover.mutate({ cardId: card.id, version: card.version, cover })
            }
            onRemoveCover={() =>
              updateCardCover.mutate({ cardId: card.id, version: card.version, cover: null })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_400px]">
            <div className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto p-5 md:border-r md:border-slate-200">
              <CardTitle
                title={card.title}
                isDone={card.isDone}
                onToggleDone={() =>
                  updateCard.mutate({
                    cardId: card.id,
                    version: card.version,
                    isDone: !card.isDone,
                  })
                }
              />

              <CardQuickActions
                boardId={boardId}
                cardId={card.id}
                labels={card.labels}
                assignees={card.assignees}
              />

              <div className="flex flex-wrap gap-4">
                <CardMembers boardId={boardId} cardId={card.id} assignees={card.assignees} />

                <CardLabels boardId={boardId} cardId={card.id} labels={card.labels} />

                {card.dueDate && <CardDueDate dueDate={card.dueDate} isOverdue={isOverdue} />}
              </div>

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
