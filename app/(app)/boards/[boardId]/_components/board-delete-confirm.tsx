"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PopoverSubHeader } from "@/components/ui/popover";

import { useDeleteBoard } from "../../_hooks/use-delete-board";

export function BoardDeleteConfirm({
  boardId,
  onBack,
}: {
  boardId: string;
  onBack: () => void;
}) {
  const router = useRouter();
  const deleteBoard = useDeleteBoard();

  function handleDelete() {
    deleteBoard.mutate(boardId, { onSuccess: () => router.push("/boards") });
  }

  return (
    <>
      <PopoverSubHeader title="Delete board?" onBack={onBack} />
      <p className="text-[13px] text-muted-foreground">
        Deleting a board is permanent and will delete all lists and cards in it. There is no way
        to get it back.
      </p>
      <Button
        variant="destructive"
        className="w-full cursor-pointer"
        disabled={deleteBoard.isPending}
        onClick={handleDelete}
      >
        {deleteBoard.isPending ? "Deleting…" : "Delete board"}
      </Button>
    </>
  );
}
