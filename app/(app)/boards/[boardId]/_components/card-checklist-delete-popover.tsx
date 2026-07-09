"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";

export function CardChecklistDeletePopover({
  isDeleting,
  onConfirm,
}: {
  isDeleting: boolean;
  onConfirm: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" size="sm" className="cursor-pointer" />}>
        Delete
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 gap-3">
        <div className="flex items-center justify-between">
          <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">
            Delete Checklist?
          </PopoverTitle>
          <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>

        <p className="text-[13px] text-slate-600">
          Deleting a checklist is permanent and there is no way to get it back.
        </p>

        <Button
          variant="destructive"
          className="w-full cursor-pointer"
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {isDeleting ? "Deleting…" : "Delete checklist"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
