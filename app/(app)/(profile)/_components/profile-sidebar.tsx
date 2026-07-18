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
    <div className="flex shrink-0 flex-col border-b border-border px-4 py-3 md:w-64 md:border-r md:border-b-0 md:py-6">
      <div className="flex items-center gap-1 md:mb-4 md:block">
        <Link
          href="/boards"
          aria-label="Back to boards"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-[13.5px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-4.5 shrink-0" />
          <span className="hidden md:inline">Back to boards</span>
        </Link>

        <nav className="flex flex-1 items-center gap-1 md:hidden">
          {PERSONAL_SETTINGS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-[13.5px]",
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

      <div className="mb-2 hidden px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase md:block">
        Personal Settings
      </div>
      <nav className="hidden flex-col gap-0.5 md:flex">
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
