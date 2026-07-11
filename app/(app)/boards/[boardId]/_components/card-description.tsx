"use client";

import { AlignLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useUpdateCard } from "../_hooks/use-update-card";
import { CardDescriptionViewer } from "./card-description-viewer";
import { MarkdownEditor } from "./markdown-editor";

export function CardDescription({
  boardId,
  cardId,
  version,
  description,
  expanded,
  onToggleExpanded,
}: {
  boardId: string;
  cardId: string;
  version: number;
  description: string | null;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const updateCard = useUpdateCard(boardId);

  function handleSave(markdown: string) {
    updateCard.mutate(
      { cardId, version, description: markdown },
      { onSuccess: () => setIsEditing(false) },
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlignLeft className="size-4" />
          Description
        </div>
        {description && !isEditing && (
          <Button
            variant="secondary"
            size="sm"
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <MarkdownEditor
          boardId={boardId}
          cardId={cardId}
          initialValue={description ?? ""}
          placeholder="Add a more detailed description…"
          isSaving={updateCard.isPending}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : description ? (
        <div>
          <div className="relative">
            <CardDescriptionViewer
              description={description}
              expanded={expanded}
              onOverflowChange={setIsOverflowing}
            />
            {!expanded && isOverflowing && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white to-transparent" />
            )}
          </div>
          {(expanded || isOverflowing) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-1 w-full cursor-pointer justify-center gap-1.5 text-foreground"
              onClick={onToggleExpanded}
            >
              <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="w-full cursor-pointer rounded-md bg-muted px-3 py-2 text-left text-[13.5px] text-muted-foreground hover:bg-accent"
        >
          Add a more detailed description…
        </button>
      )}
    </div>
  );
}
