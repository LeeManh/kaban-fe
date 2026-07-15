"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SharePopover({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `${typeof window !== "undefined" ? window.location.origin : ""}${path}`;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setCopied(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="cursor-pointer">
            Share
          </Button>
        }
      />
      <PopoverContent align="end" className="w-90 gap-3.5 p-4">
        <div className="flex items-center justify-between">
          <PopoverTitle className="mx-auto text-sm font-semibold text-foreground">
            Share
          </PopoverTitle>
          <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
            <X />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>

        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1"
          />
          <Button
            variant="outline"
            className="shrink-0 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
