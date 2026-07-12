"use client";

import { useSyncExternalStore } from "react";

export type DesktopNotificationPermission = NotificationPermission | "unsupported";

const CHANGE_EVENT = "desktop-notification-permission-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getSnapshot(): DesktopNotificationPermission {
  return "Notification" in window ? Notification.permission : "unsupported";
}

function getServerSnapshot(): DesktopNotificationPermission {
  return "default";
}

export function useDesktopNotificationPermission() {
  const permission = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  async function requestPermission() {
    if (!("Notification" in window)) return;
    await Notification.requestPermission();
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { permission, requestPermission };
}
