import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ message: "Unsplash is not configured." }, { status: 500 });
  }

  const { downloadLocation } = await request.json();
  if (typeof downloadLocation !== "string") {
    return NextResponse.json({ message: "downloadLocation is required." }, { status: 400 });
  }

  await fetch(downloadLocation, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  return NextResponse.json({ ok: true });
}
