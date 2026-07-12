"use client";

import { Button } from "@/components/ui/button";
import { PopoverSubHeader } from "@/components/ui/popover";

import { useDeleteList } from "../_hooks/use-delete-list";

export function ListDeleteConfirm({
  boardId,
  listId,
  onBack,
  onDone,
}: {
  boardId: string;
  listId: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const deleteList = useDeleteList(boardId);

  function handleDelete() {
    deleteList.mutate(listId, { onSuccess: onDone });
  }

  return (
    <>
      <PopoverSubHeader title="Delete list?" onBack={onBack} />
      <p className="text-[13px] text-muted-foreground">
        Deleting a list is permanent and will delete all cards in it. There is no way to get it
        back.
      </p>
      <Button
        variant="destructive"
        className="w-full cursor-pointer"
        disabled={deleteList.isPending}
        onClick={handleDelete}
      >
        {deleteList.isPending ? "Deleting…" : "Delete list"}
      </Button>
    </>
  );
}
