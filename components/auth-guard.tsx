"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

import { getAccessToken } from "@/lib/api/tokens";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function useIsAuthenticated() {
  return useSyncExternalStore(
    subscribe,
    () => !!getAccessToken(),
    () => false,
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) return;
    const current = `${window.location.pathname}${window.location.search}`;
    router.replace(`/login?redirect=${encodeURIComponent(current)}`);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return children;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) return;
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    const target =
      redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/boards";
    router.replace(target);
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;
  return children;
}
