import { NextResponse } from "next/server";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";

interface UnsplashApiPhoto {
  id: string;
  urls: { thumb: string; regular: string };
  links: { download_location: string };
  user: { name: string; links: { html: string } };
}

interface UnsplashSearchResponse {
  total_pages: number;
  results: UnsplashApiPhoto[];
}

export async function GET(request: Request) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ message: "Unsplash is not configured." }, { status: 500 });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim();
  if (!query) {
    return NextResponse.json({ message: "Missing query." }, { status: 400 });
  }

  const requestedPage = Number(url.searchParams.get("page"));
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const requestedPerPage = Number(url.searchParams.get("per_page"));
  const perPage = Number.isInteger(requestedPerPage) ? Math.min(Math.max(requestedPerPage, 1), 30) : 20;

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`,
    { headers: { Authorization: `Client-ID ${accessKey}` }, cache: "no-store" },
  );

  if (!response.ok) {
    return NextResponse.json({ message: "Could not search photos." }, { status: response.status });
  }

  const data: UnsplashSearchResponse = await response.json();

  const photos: UnsplashPhoto[] = data.results.map((photo) => ({
    id: photo.id,
    thumbUrl: photo.urls.thumb,
    regularUrl: photo.urls.regular,
    downloadLocation: photo.links.download_location,
    authorName: photo.user.name,
    authorUrl: photo.user.links.html,
  }));

  return NextResponse.json({ photos, totalPages: data.total_pages });
}
