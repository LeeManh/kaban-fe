"use client";

import { SquareKanban, FilePlusCorner } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/templates", label: "Templates", icon: FilePlusCorner },
];

export function Sidebar() {
  const pathname = usePathname();

  function renderNavLink(link: NavLinkItem) {
    if (link.href) {
      const active = pathname.startsWith(link.href);
      return (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3.5 py-2 text-[13.5px]",
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
          "flex items-center gap-3 rounded-md px-3.5 py-2.75 text-left text-[13.5px] font-medium",
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
    <aside className="flex w-64 flex-none flex-col overflow-hidden pt-4">
      <nav className="flex flex-col gap-1 px-4 pt-6 pb-1">{PRIMARY_LINKS.map(renderNavLink)}</nav>
    </aside>
  );
}
