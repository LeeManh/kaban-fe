"use client";

import { LogOut, Settings, SquareKanban, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { clearTokens } from "@/lib/api/tokens";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

const PRIMARY_LINKS: NavLinkItem[] = [
  { href: "/boards", label: "Boards", icon: SquareKanban },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearTokens();
    router.replace("/login");
  }

  const accountLinks: NavLinkItem[] = [
    { label: "Log out", icon: LogOut, onClick: handleLogout, danger: true },
  ];

  function renderNavLink(link: NavLinkItem) {
    if (link.href) {
      const active = pathname.startsWith(link.href);
      return (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "flex items-center gap-2.75 rounded-md px-2.5 py-2 text-[13.5px]",
            active
              ? "bg-blue-50 font-semibold text-primary"
              : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
        >
          <link.icon className="size-4.5 shrink-0" />
          <span>{link.label}</span>
        </Link>
      );
    }
    return (
      <button
        key={link.label}
        type="button"
        onClick={link.onClick}
        className={cn(
          "flex items-center gap-2.75 rounded-md px-2.5 py-2 text-left text-[13.5px] font-medium",
          link.danger
            ? "text-red-600 hover:bg-red-50"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        )}
      >
        <link.icon className="size-4.5 shrink-0" />
        <span>{link.label}</span>
      </button>
    );
  }

  return (
    <aside className="flex w-60 flex-none flex-col overflow-hidden border-r border-slate-200 bg-white">
      <div className="flex h-14 flex-none items-center gap-2.5 border-b border-slate-100 px-3.5">
        <div className="flex size-7.5 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-500 shadow-[0_2px_5px_--theme(--color-blue-600/35%)]">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="18" rx="1.5" />
            <rect x="14" y="3" width="7" height="11" rx="1.5" />
          </svg>
        </div>
        <span className="flex-1 text-[17px] font-bold tracking-[-0.02em]">Kanvas</span>
      </div>

      <nav className="flex flex-col gap-0.5 px-2.5 pt-3.5 pb-1">
        {PRIMARY_LINKS.map(renderNavLink)}
      </nav>

      <div className="flex-1" />

      <nav className="flex flex-col gap-0.5 px-2.5 pt-1 pb-3.5">
        <Separator className="mb-2" />
        {accountLinks.map(renderNavLink)}
      </nav>
    </aside>
  );
}
