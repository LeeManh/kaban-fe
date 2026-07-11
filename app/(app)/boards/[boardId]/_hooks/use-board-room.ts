"use client";

import { useEffect } from "react";

import { useSocket } from "@/app/(app)/_context/socket-provider";
import { SOCKET_EVENT } from "@/lib/socket-events";

export function useBoardRoom(boardId: string) {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    socket.emit(SOCKET_EVENT.JOIN_BOARD, { boardId });

    return () => {
      socket.emit(SOCKET_EVENT.LEAVE_BOARD, { boardId });
    };
  }, [socket, isConnected, boardId]);
}
