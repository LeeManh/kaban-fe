import { NextResponse } from "next/server";

export interface UnsplashPhoto {
  id: string;
  thumbUrl: string;
  regularUrl: string;
  downloadLocation: string;
  authorName: string;
  authorUrl: string;
}

interface UnsplashApiPhoto {
  id: string;
  urls: { thumb: string; regular: string };
  links: { download_location: string };
  user: { name: string; links: { html: string } };
}

export async function GET(request: Request) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ message: "Unsplash is not configured." }, { status: 500 });
  }

  const requestedCount = Number(new URL(request.url).searchParams.get("count"));
  const count = Number.isInteger(requestedCount) ? Math.min(Math.max(requestedCount, 1), 30) : 4;

  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&orientation=landscape&query=landscape`,
    { headers: { Authorization: `Client-ID ${accessKey}` }, cache: "no-store" },
  );

  if (!response.ok) {
    return NextResponse.json({ message: "Could not load photos." }, { status: response.status });
  }

  const data: UnsplashApiPhoto[] = await response.json();

  const photos: UnsplashPhoto[] = data.map((photo) => ({
    id: photo.id,
    thumbUrl: photo.urls.thumb,
    regularUrl: photo.urls.regular,
    downloadLocation: photo.links.download_location,
    authorName: photo.user.name,
    authorUrl: photo.user.links.html,
  }));

  return NextResponse.json(photos);
}
