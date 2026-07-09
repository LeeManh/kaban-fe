"use client";

import { ExternalLink, File as FileIcon, FileArchive, FileSpreadsheet, FileText, Paperclip } from "lucide-react";

import type { CardAttachment } from "@/lib/api/cards";
import { cn, formatAddedAt } from "@/lib/utils";

import { CardAttachFilePopover } from "./card-attach-file-popover";
import { CardAttachmentActions } from "./card-attachment-actions";

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
      return { Icon: FileText, className: "text-slate-500" };
    case "application/zip":
      return { Icon: FileArchive, className: "text-amber-600" };
    default:
      return { Icon: FileIcon, className: "text-slate-500" };
  }
}

export function CardAttachments({
  boardId,
  cardId,
  attachments,
}: {
  boardId: string;
  cardId: string;
  attachments: CardAttachment[];
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Paperclip className="size-4" />
          Attachments
        </div>
        <CardAttachFilePopover boardId={boardId} cardId={cardId} />
      </div>
      {attachments.length > 0 && (
        <>
          <div className="mb-1.5 text-xs font-semibold text-slate-500">Files</div>
          <div className="flex flex-col gap-1">
            {attachments.map((attachment) => {
              const isImage = attachment.mimeType?.startsWith("image/");
              const { Icon, className } = getFileIconMeta(attachment.mimeType);

              return (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 rounded-md p-1.5 hover:bg-slate-100"
                >
                  <div className="flex h-11 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-slate-200">
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
                    <div className="truncate text-[13.5px] font-medium text-slate-800">
                      {attachment.filename}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      {formatAddedAt(attachment.createdAt)}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Open attachment"
                    onClick={() => window.open(attachment.downloadUrl, "_blank")}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
                  >
                    <ExternalLink className="size-3.75" />
                  </button>
                  <CardAttachmentActions boardId={boardId} attachment={attachment} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
