"use client";

import type { Editor } from "@tiptap/react";
import { ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ALLOWED_DESCRIPTION_IMAGE_MIME_TYPES, MAX_DESCRIPTION_IMAGE_SIZE } from "@/lib/api/cards";

import { usePresignDescriptionImage } from "../_hooks/use-presign-description-image";

const MAX_RECENT_IMAGES = 8;

export function CardDescriptionImagePopover({
  boardId,
  cardId,
  editor,
}: {
  boardId: string;
  cardId: string;
  editor: Editor;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presignImage = usePresignDescriptionImage(boardId, cardId);

  function insertImage(src: string) {
    editor.chain().focus().setImage({ src }).run();
    setRecentImages((prev) => [src, ...prev.filter((item) => item !== src)].slice(0, MAX_RECENT_IMAGES));
    setUrl("");
    setOpen(false);
  }

  function submitUrl() {
    const trimmed = url.trim();
    if (!trimmed) return;
    insertImage(trimmed);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);

    if (!ALLOWED_DESCRIPTION_IMAGE_MIME_TYPES.includes(file.type as never)) {
      setError("Only JPEG, PNG, or WEBP images are allowed.");
      return;
    }
    if (file.size > MAX_DESCRIPTION_IMAGE_SIZE) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    presignImage.mutate(file, {
      onSuccess: (viewUrl) => {
        setRecentImages((prev) => [viewUrl, ...prev.filter((item) => item !== viewUrl)].slice(0, MAX_RECENT_IMAGES));
      },
      onError: () => setError("Upload failed, please try again."),
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Image"
                  className="cursor-pointer"
                />
              }
            >
              <ImageIcon className="size-3.5" />
            </PopoverTrigger>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          Image
        </TooltipContent>
      </Tooltip>
      <PopoverContent align="start" className="w-80 gap-3">
        <div className="flex items-center justify-between">
          <PopoverTitle className="mx-auto text-sm font-semibold text-foreground">
            Select image
          </PopoverTitle>
          <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>

        {recentImages.length > 0 && (
          <div>
            <div className="mb-1.5 text-xs font-semibold text-foreground">Recently uploaded</div>
            <div className="grid grid-cols-4 gap-1.5">
              {recentImages.map((src) => (
                <button
                  key={src}
                  type="button"
                  aria-label="Insert image"
                  onClick={() => insertImage(src)}
                  style={{ backgroundImage: `url(${src})` }}
                  className="h-16 cursor-pointer rounded-md bg-muted bg-cover bg-center hover:brightness-95 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Attach an image link</div>
          <div className="flex gap-2">
            <Input
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitUrl();
                }
              }}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button size="default" className="cursor-pointer" disabled={!url.trim()} onClick={submitUrl}>
              Submit
            </Button>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full cursor-pointer"
          disabled={presignImage.isPending}
          onClick={() => fileInputRef.current?.click()}
        >
          {presignImage.isPending ? "Uploading…" : "Upload from your computer"}
        </Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_DESCRIPTION_IMAGE_MIME_TYPES.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
      </PopoverContent>
    </Popover>
  );
}
