"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PopoverSubHeader } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useBoard } from "../_hooks/use-board";
import { useMoveListToBoard } from "../_hooks/use-move-list-to-board";
import { useBoards } from "../../_hooks/use-boards";

export function ListMoveForm({
  open,
  boardId,
  listId,
  onBack,
  onDone,
}: {
  open: boolean;
  boardId: string;
  listId: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [moveTargetBoardId, setMoveTargetBoardId] = useState("");
  const [movePosition, setMovePosition] = useState(1);

  const moveListToBoard = useMoveListToBoard(boardId);
  const { data: boards = [] } = useBoards({ enabled: open });
  const otherBoards = boards.filter((b) => b.id !== boardId);
  const selectedBoardId = moveTargetBoardId || (otherBoards[0]?.id ?? "");
  const { data: targetBoard } = useBoard(selectedBoardId, {
    enabled: open && !!selectedBoardId,
  });
  const positionCount = (targetBoard?.lists.length ?? 0) + 1;

  function handleMove() {
    moveListToBoard.mutate(
      { listId, targetBoardId: selectedBoardId, position: movePosition },
      {
        onSuccess: () => {
          toast.success("List moved.");
          onDone();
        },
      },
    );
  }

  return (
    <>
      <PopoverSubHeader title="Move list" onBack={onBack} />
      <div>
        <div className="mb-1.5 text-xs font-semibold text-foreground">Board</div>
        <Select
          value={selectedBoardId}
          onValueChange={(value) => {
            setMoveTargetBoardId(value as string);
            setMovePosition(1);
          }}
        >
          <SelectTrigger>
            <SelectValue>
              {(value: string) => otherBoards.find((b) => b.id === value)?.name ?? value}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {otherBoards.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-1.5 text-xs font-semibold text-foreground">Position</div>
        <Select value={movePosition} onValueChange={(value) => setMovePosition(value as number)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: positionCount }, (_, i) => i + 1).map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full cursor-pointer"
        disabled={moveListToBoard.isPending}
        onClick={handleMove}
      >
        {moveListToBoard.isPending ? "Moving…" : "Move"}
      </Button>
    </>
  );
}
