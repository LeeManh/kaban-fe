"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { SOCKET_EVENT } from "@/lib/socket-events";

import { useSocket } from "../_context/socket-provider";

export function useNotificationsRealtime() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    function handleNotificationCreated() {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }

    socket.on(SOCKET_EVENT.NOTIFICATION_CREATED, handleNotificationCreated);

    return () => {
      socket.off(SOCKET_EVENT.NOTIFICATION_CREATED, handleNotificationCreated);
    };
  }, [socket, queryClient]);
}
