"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { Notification } from "@/lib/api/notifications";
import { SOCKET_EVENT } from "@/lib/socket-events";

import { useSocket } from "../_context/socket-provider";

function showDesktopNotification(notification: Notification, router: ReturnType<typeof useRouter>) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  if (!document.hidden) return;

  const desktopNotification = new window.Notification("Kanvas", {
    body: notification.message,
    icon: "/icon.svg",
  });

  desktopNotification.onclick = () => {
    window.focus();
    if (notification.link) router.push(notification.link);
    desktopNotification.close();
  };
}

export function useNotificationsRealtime() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    function handleNotificationCreated(notification: Notification) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      showDesktopNotification(notification, router);
    }

    socket.on(SOCKET_EVENT.NOTIFICATION_CREATED, handleNotificationCreated);

    return () => {
      socket.off(SOCKET_EVENT.NOTIFICATION_CREATED, handleNotificationCreated);
    };
  }, [socket, queryClient, router]);
}
