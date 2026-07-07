"use client";

import { Ellipsis, ExternalLink, File as FileIcon, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CardAttachment } from "@/lib/api/cards";
import { formatAddedAt } from "@/lib/utils";

export function CardAttachments({ attachments }: { attachments: CardAttachment[] }) {
  return (
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
      {attachments.length > 0 && (
        <>
          <div className="mb-1.5 text-xs font-semibold text-slate-500">Files</div>
          <div className="flex flex-col gap-1">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-3 rounded-md p-1.5 hover:bg-slate-100"
              >
                <div className="flex h-11 w-16 shrink-0 items-center justify-center rounded-sm bg-slate-200">
                  <FileIcon className="size-4 text-slate-500" />
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
        </>
      )}
    </div>
  );
}
