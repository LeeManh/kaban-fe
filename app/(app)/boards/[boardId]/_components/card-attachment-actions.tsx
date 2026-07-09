"use client";

import { ChevronLeft, Ellipsis, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import type { CardAttachment } from "@/lib/api/cards";
import { downloadFile } from "@/lib/utils";

import { useDeleteAttachment } from "../_hooks/use-delete-attachment";
import { useRenameAttachment } from "../_hooks/use-rename-attachment";

const MENU_ITEMS = ["Edit", "Download", "Remove"] as const;

export function CardAttachmentActions({
  boardId,
  attachment,
}: {
  boardId: string;
  attachment: CardAttachment;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"menu" | "edit">("menu");
  const [filename, setFilename] = useState(attachment.filename);

  const renameAttachment = useRenameAttachment(boardId);
  const deleteAttachment = useDeleteAttachment(boardId);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setView("menu");
      setFilename(attachment.filename);
    }
  }

  function handleMenuItemClick(item: (typeof MENU_ITEMS)[number]) {
    if (item === "Edit") {
      setFilename(attachment.filename);
      setView("edit");
      return;
    }
    if (item === "Download") {
      downloadFile(attachment.downloadUrl, attachment.filename);
      handleOpenChange(false);
      return;
    }
    if (item === "Remove") {
      deleteAttachment.mutate(attachment.id);
      handleOpenChange(false);
    }
  }

  function handleUpdate() {
    const trimmed = filename.trim();
    if (!trimmed) return;
    renameAttachment.mutate(
      { attachmentId: attachment.id, filename: trimmed },
      { onSuccess: () => handleOpenChange(false) },
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Attachment actions"
            className="cursor-pointer text-slate-500 hover:bg-slate-200"
          />
        }
      >
        <Ellipsis className="size-3.75" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 gap-3">
        {view === "menu" ? (
          <div className="flex flex-col">
            {MENU_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleMenuItemClick(item)}
                className={
                  item === "Remove"
                    ? "cursor-pointer rounded-md p-2 text-left text-[13.5px] font-medium text-destructive hover:bg-destructive/10"
                    : "cursor-pointer rounded-md p-2 text-left text-[13.5px] font-medium text-slate-800 hover:bg-slate-100"
                }
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <>
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
              <PopoverTitle className="flex-1 text-center text-sm font-semibold text-slate-900">
                Edit attachment
              </PopoverTitle>
              <PopoverClose
                render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}
              >
                <X className="size-3.5" />
                <span className="sr-only">Close</span>
              </PopoverClose>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-700">File name</div>
              <Input
                autoFocus
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUpdate();
                  }
                }}
              />
            </div>

            <Button
              className="w-full cursor-pointer"
              disabled={!filename.trim() || renameAttachment.isPending}
              onClick={handleUpdate}
            >
              {renameAttachment.isPending ? "Updating…" : "Update"}
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
