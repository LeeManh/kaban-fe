import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL as string;

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Kanvas — Organize your work, together",
    template: "%s — Kanvas",
  },
  description:
    "Kanvas is a simple, fast board for organizing tasks and projects — boards, lists, and cards that keep your team moving.",
  openGraph: {
    type: "website",
    siteName: "Kanvas",
    title: "Kanvas — Organize your work, together",
    description:
      "Kanvas is a simple, fast board for organizing tasks and projects — boards, lists, and cards that keep your team moving.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanvas — Organize your work, together",
    description:
      "Kanvas is a simple, fast board for organizing tasks and projects — boards, lists, and cards that keep your team moving.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
