"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useSocket } from "@/app/(app)/_context/socket-provider";
import { SOCKET_EVENT } from "@/lib/socket-events";

interface BoardScopedPayload {
  boardId: string;
}

export function useBoardRealtime(boardId: string) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    function handleBoardStructureChanged(payload: BoardScopedPayload) {
      if (payload.boardId !== boardId) return;
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    }

    const boardEvents = [
      SOCKET_EVENT.LIST_CREATED,
      SOCKET_EVENT.LIST_UPDATED,
      SOCKET_EVENT.LIST_MOVED,
      SOCKET_EVENT.LIST_DELETED,
      SOCKET_EVENT.CARD_CREATED,
      SOCKET_EVENT.CARD_UPDATED,
      SOCKET_EVENT.CARD_MOVED,
      SOCKET_EVENT.CARD_DELETED,
      SOCKET_EVENT.CARD_ASSIGNEE_CHANGED,
      SOCKET_EVENT.COMMENT_ADDED,
      SOCKET_EVENT.CHECKLIST_ITEM_TOGGLED,
      SOCKET_EVENT.ATTACHMENT_ADDED,
      SOCKET_EVENT.LABEL_CREATED,
      SOCKET_EVENT.LABEL_UPDATED,
      SOCKET_EVENT.LABEL_DELETED,
    ];

    boardEvents.forEach((event) => socket.on(event, handleBoardStructureChanged));

    function handleMemberRemoved(payload: BoardScopedPayload) {
      if (payload.boardId !== boardId) return;
      queryClient.removeQueries({ queryKey: ["boards", boardId] });
      toast.error("You have been removed from this board.");
      router.push("/boards");
    }

    socket.on(SOCKET_EVENT.BOARD_MEMBER_REMOVED, handleMemberRemoved);

    return () => {
      boardEvents.forEach((event) => socket.off(event, handleBoardStructureChanged));
      socket.off(SOCKET_EVENT.BOARD_MEMBER_REMOVED, handleMemberRemoved);
    };
  }, [socket, boardId, queryClient, router]);
}
