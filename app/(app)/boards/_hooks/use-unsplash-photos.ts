"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";

async function fetchUnsplashPhotos(count: number): Promise<UnsplashPhoto[]> {
  const response = await fetch(`/api/unsplash/random?count=${count}`);
  if (!response.ok) throw new Error("Could not load photos.");
  return response.json();
}

export function useUnsplashPhotos(enabled: boolean, count = 4) {
  return useQuery({
    queryKey: ["unsplash-random", count],
    queryFn: () => fetchUnsplashPhotos(count),
    enabled,
    staleTime: Infinity,
    retry: false,
  });
}

export function useUnsplashSearchPhotos(enabled: boolean, pageSize = 12) {
  return useInfiniteQuery({
    queryKey: ["unsplash-search", pageSize],
    queryFn: () => fetchUnsplashPhotos(pageSize),
    enabled,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => allPages.length,
    staleTime: Infinity,
    retry: false,
  });
}

interface UnsplashSearchResult {
  photos: UnsplashPhoto[];
  totalPages: number;
}

async function fetchUnsplashSearch(
  query: string,
  page: number,
  perPage: number,
): Promise<UnsplashSearchResult> {
  const response = await fetch(
    `/api/unsplash/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
  );
  if (!response.ok) throw new Error("Could not search photos.");
  return response.json();
}

export function useUnsplashSearch(enabled: boolean, query: string, pageSize = 20) {
  return useInfiniteQuery({
    queryKey: ["unsplash-search-query", query, pageSize],
    queryFn: ({ pageParam }) => fetchUnsplashSearch(query, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
    enabled: enabled && query.trim().length > 0,
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
