"use client";

import {
  ExternalLink,
  File as FileIcon,
  FileArchive,
  FileSpreadsheet,
  FileText,
  TextAlignStart,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import type { CardAttachment, Checklist } from "@/lib/api/cards";
import { cn, toBackgroundStyle } from "@/lib/utils";

import { getLabelTooltipText, LabelSwatch } from "../../boards/[boardId]/_components/label-swatch";
import { useTemplateCard } from "../_hooks/use-template-card";

function getFileIconMeta(mimeType: string | null) {
  switch (mimeType) {
    case "application/pdf":
      return { Icon: FileText, className: "text-red-500" };
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return { Icon: FileText, className: "text-blue-500" };
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return { Icon: FileSpreadsheet, className: "text-emerald-600" };
    case "text/plain":
      return { Icon: FileText, className: "text-muted-foreground" };
    case "application/zip":
      return { Icon: FileArchive, className: "text-amber-600" };
    default:
      return { Icon: FileIcon, className: "text-muted-foreground" };
  }
}

function AttachmentRow({ attachment }: { attachment: CardAttachment }) {
  const isImage = attachment.mimeType?.startsWith("image/");
  const { Icon, className } = getFileIconMeta(attachment.mimeType);

  return (
    <div className="flex items-center gap-3 rounded-md p-1.5 hover:bg-accent">
      <div className="flex h-11 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={attachment.downloadUrl}
            alt={attachment.filename}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon className={cn("size-5", className)} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13.5px] font-medium text-foreground">
          {attachment.filename}
        </div>
      </div>
      <a
        href={attachment.downloadUrl}
        target="_blank"
        rel="noreferrer"
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-background"
      >
        <ExternalLink className="size-3.75" />
      </a>
    </div>
  );
}

function ChecklistPreview({ checklist }: { checklist: Checklist }) {
  const doneCount = checklist.items.filter((item) => item.isDone).length;
  const percent =
    checklist.items.length > 0 ? Math.round((doneCount / checklist.items.length) * 100) : 0;

  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-foreground">{checklist.title}</div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{percent}%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        {checklist.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2.5 rounded-md px-1.5 py-1">
            <Checkbox checked={item.isDone} disabled />
            <span
              className={cn(
                "flex-1 text-[13.5px] text-foreground",
                item.isDone && "text-muted-foreground line-through",
              )}
            >
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TemplateCardDetailDialog({
  templateId,
  cardId,
  onClose,
}: {
  templateId: string;
  cardId: string | null;
  onClose: () => void;
}) {
  const { data: card, isLoading } = useTemplateCard(templateId, cardId);

  if (!cardId) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-md bg-background shadow-xl">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5">
          {isLoading || !card ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
            {card.cover && (
              <div
                style={{ background: toBackgroundStyle(card.cover) }}
                className="-mx-5 -mt-5 mb-4 h-40 shrink-0 bg-cover bg-center"
              />
            )}

            {card.labels.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {card.labels.map((label) => (
                  <LabelSwatch
                    key={label.id}
                    label={label}
                    showText
                    title={getLabelTooltipText(label)}
                    className="h-6 px-2 text-xs"
                  />
                ))}
              </div>
            )}

            <h2 className="mb-3 text-xl font-semibold text-foreground">{card.title}</h2>

            {card.assignees.length > 0 && (
              <div className="mb-4 flex items-center gap-1.5">
                {card.assignees.map((assignee) => (
                  <UserAvatar key={assignee.id} user={assignee} className="size-7" />
                ))}
              </div>
            )}

            {card.description && (
              <div className="mb-5">
                <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <TextAlignStart className="size-4" />
                  Description
                </div>
                <p className="text-[13.5px] leading-relaxed whitespace-pre-line text-muted-foreground">
                  {card.description}
                </p>
              </div>
            )}

            {card.attachments.length > 0 && (
              <div className="mb-5">
                <div className="mb-1.5 text-sm font-semibold text-foreground">Attachments</div>
                <div className="flex flex-col gap-1">
                  {card.attachments.map((attachment) => (
                    <AttachmentRow key={attachment.id} attachment={attachment} />
                  ))}
                </div>
              </div>
            )}

            {card.checklists.map((checklist) => (
              <div key={checklist.id} className="mb-5">
                <ChecklistPreview checklist={checklist} />
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
