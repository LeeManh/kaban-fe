"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

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

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard client-mount detection idiom
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted || isAuthenticated) return;
    const current = `${window.location.pathname}${window.location.search}`;
    router.replace(`/login?redirect=${encodeURIComponent(current)}`);
  }, [hasMounted, isAuthenticated, router]);

  if (!hasMounted || !isAuthenticated) return null;
  return children;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted || !isAuthenticated) return;
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    const target =
      redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/boards";
    router.replace(target);
  }, [hasMounted, isAuthenticated, router]);

  if (hasMounted && isAuthenticated) return null;
  return children;
}
