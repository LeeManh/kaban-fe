"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { CardSummary } from "@/lib/api/boards";

import { useCard } from "../_hooks/use-card";
import { useUpdateCard } from "../_hooks/use-update-card";
import { useUpdateCardCover } from "../_hooks/use-update-card-cover";
import { CardAttachments } from "./card-attachments";
import { CardAttachmentsSkeleton } from "./card-attachments-skeleton";
import { CardChecklist } from "./card-checklist";
import { CardChecklistSkeleton } from "./card-checklist-skeleton";
import { CardComments } from "./card-comments";
import { CardCommentsSkeleton } from "./card-comments-skeleton";
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

  const { data: detail, isLoading: isDetailLoading } = useCard(boardId, card.id, {
    enabled: open,
  });
  const checklists = detail?.checklists ?? [];
  const attachments = detail?.attachments ?? [];
  const comments = detail?.comments ?? [];

  const updateCard = useUpdateCard(boardId);
  const updateCardCover = useUpdateCardCover(boardId);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl"
        >
          <CardCoverBanner
            boardId={boardId}
            cardId={card.id}
            assignees={card.assignees}
            listTitle={listTitle}
            cover={card.cover}
            onCoverChange={(cover) =>
              updateCardCover.mutate({ cardId: card.id, version: card.version, cover })
            }
            onRemoveCover={() =>
              updateCardCover.mutate({ cardId: card.id, version: card.version, cover: null })
            }
          />

          <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex h-full flex-col gap-5 overflow-y-auto p-5 md:border-r md:border-border">
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
                version={card.version}
                dueDate={card.dueDate}
                reminderOffsetMinutes={card.reminderOffsetMinutes}
                labels={card.labels}
                assignees={card.assignees}
              />

              <div className="flex flex-wrap gap-4">
                <CardMembers boardId={boardId} cardId={card.id} assignees={card.assignees} />

                <CardLabels boardId={boardId} cardId={card.id} labels={card.labels} />

                {card.dueDate && (
                  <CardDueDate
                    boardId={boardId}
                    cardId={card.id}
                    version={card.version}
                    dueDate={card.dueDate}
                    reminderOffsetMinutes={card.reminderOffsetMinutes}
                    isDone={card.isDone}
                  />
                )}
              </div>

              <CardDescription
                boardId={boardId}
                cardId={card.id}
                version={card.version}
                description={card.description}
                expanded={descriptionExpanded}
                onToggleExpanded={() => setDescriptionExpanded((v) => !v)}
              />

              {isDetailLoading ? (
                <CardAttachmentsSkeleton />
              ) : (
                <CardAttachments boardId={boardId} cardId={card.id} attachments={attachments} />
              )}

              {isDetailLoading ? (
                <CardChecklistSkeleton />
              ) : (
                checklists.map((checklist) => (
                  <CardChecklist key={checklist.id} boardId={boardId} checklist={checklist} />
                ))
              )}
            </div>

            {isDetailLoading ? (
              <CardCommentsSkeleton />
            ) : (
              <CardComments boardId={boardId} cardId={card.id} comments={comments} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
