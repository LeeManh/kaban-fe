"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverSubHeader } from "@/components/ui/popover";

import { useCopyList } from "../_hooks/use-copy-list";

export function ListCopyForm({
  boardId,
  listId,
  listTitle,
  onBack,
  onDone,
}: {
  boardId: string;
  listId: string;
  listTitle: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [copyTitle, setCopyTitle] = useState(listTitle);
  const copyList = useCopyList(boardId);

  function handleCopy() {
    const trimmed = copyTitle.trim();
    if (!trimmed) return;
    copyList.mutate(
      { listId, payload: { title: trimmed } },
      {
        onSuccess: () => {
          toast.success("List copied.");
          onDone();
        },
      },
    );
  }

  return (
    <>
      <PopoverSubHeader title="Copy list" onBack={onBack} />
      <div>
        <div className="mb-1.5 text-xs font-semibold text-foreground">Name</div>
        <Input
          autoFocus
          value={copyTitle}
          onChange={(e) => setCopyTitle(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCopy();
          }}
        />
      </div>
      <Button
        className="w-full cursor-pointer"
        disabled={!copyTitle.trim() || copyList.isPending}
        onClick={handleCopy}
      >
        {copyList.isPending ? "Creating…" : "Create list"}
      </Button>
    </>
  );
}
