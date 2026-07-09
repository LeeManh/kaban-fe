"use client";

import { Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ALLOWED_ATTACHMENT_MIME_TYPES, MAX_ATTACHMENT_SIZE } from "@/lib/api/attachments";

import { usePresignAttachment } from "../_hooks/use-presign-attachment";

export function CardAttachFilePopover({ boardId, cardId }: { boardId: string; cardId: string }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presignAttachment = usePresignAttachment(boardId, cardId);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setSelectedFile(null);
      setDisplayText("");
      setError(null);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);

    if (!ALLOWED_ATTACHMENT_MIME_TYPES.includes(file.type as never)) {
      setError("This file type isn't supported.");
      return;
    }
    if (file.size > MAX_ATTACHMENT_SIZE) {
      setError("File must be smaller than 10 MB.");
      return;
    }

    setSelectedFile(file);
    setDisplayText(file.name);
  }

  function handleInsert() {
    if (!selectedFile) return;
    presignAttachment.mutate(
      { file: selectedFile, displayName: displayText },
      {
        onSuccess: () => handleOpenChange(false),
        onError: () => setError("Upload failed, please try again."),
      },
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger render={<Button variant="secondary" size="sm" className="cursor-pointer" />}>
        Add
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-3">
        <div className="flex items-center justify-between">
          <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">Attach</PopoverTitle>
          <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">
            Attach a file from your computer
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            You can also drag and drop files to upload them.
          </p>
          <Button
            variant="outline"
            className="mt-2 w-full cursor-pointer justify-center gap-1.5"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <>
                <Paperclip className="size-3.75 shrink-0" />
                <span className="min-w-0 truncate">{selectedFile.name}</span>
              </>
            ) : (
              "Choose a file"
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_ATTACHMENT_MIME_TYPES.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="border-t border-slate-200" />

        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">
            Display text <span className="text-destructive">*</span>
          </div>
          <Input
            value={displayText}
            onChange={(e) => setDisplayText(e.target.value)}
            placeholder="Text to display"
          />
          <p className="mt-1 text-xs text-slate-500">Give this link a title or description</p>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <div className="flex items-center justify-end gap-2">
          <PopoverClose render={<Button variant="ghost" className="cursor-pointer" />}>
            Cancel
          </PopoverClose>
          <Button
            className="cursor-pointer"
            disabled={!selectedFile || !displayText.trim() || presignAttachment.isPending}
            onClick={handleInsert}
          >
            {presignAttachment.isPending ? "Uploading…" : "Insert"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
