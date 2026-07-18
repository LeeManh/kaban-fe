"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { ProfileSidebar } from "./_components/profile-sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background md:flex-row">
      <ProfileSidebar />

      <div className="relative flex-1 overflow-y-auto">
        <button
          type="button"
          aria-label="Close"
          onClick={() => router.push("/boards")}
          className="absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent sm:top-6 sm:right-6"
        >
          <X className="size-4" />
        </button>

        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-10 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
