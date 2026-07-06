"use client";

import { useQuery } from "@tanstack/react-query";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";

async function fetchUnsplashPhotos(): Promise<UnsplashPhoto[]> {
  const response = await fetch("/api/unsplash/random");
  if (!response.ok) throw new Error("Could not load photos.");
  return response.json();
}

export function useUnsplashPhotos(enabled: boolean) {
  return useQuery({
    queryKey: ["unsplash-random"],
    queryFn: fetchUnsplashPhotos,
    enabled,
    staleTime: Infinity,
    retry: false,
  });
}

export function notifyUnsplashDownload(downloadLocation: string) {
  void fetch("/api/unsplash/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ downloadLocation }),
  });
}
