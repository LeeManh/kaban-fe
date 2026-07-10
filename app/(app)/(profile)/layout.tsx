"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { ProfileSidebar } from "./_components/profile-sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
      <ProfileSidebar />

      <div className="relative flex-1 overflow-y-auto">
        <button
          type="button"
          aria-label="Close"
          onClick={() => router.push("/boards")}
          className="absolute top-6 right-6 flex size-8 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
        >
          <X className="size-4" />
        </button>

        <div className="mx-auto max-w-2xl px-10 py-10">{children}</div>
      </div>
    </div>
  );
}
