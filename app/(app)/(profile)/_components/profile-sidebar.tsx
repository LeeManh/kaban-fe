"use client";

import { ArrowLeft, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const PERSONAL_SETTINGS = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 shrink-0 border-r border-border px-4 py-6">
      <Link
        href="/boards"
        className="mb-4 flex items-center gap-2 rounded-md px-3 py-2 text-[13.5px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4.5 shrink-0" />
        <span>Back to boards</span>
      </Link>

      <div className="mb-2 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Personal Settings
      </div>
      <nav className="flex flex-col gap-0.5">
        {PERSONAL_SETTINGS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[13.5px]",
                active
                  ? "bg-primary/10 font-semibold text-primary"
                  : "font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <item.icon className="size-4.5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
