"use client";

import { SquareKanban, FilePlusCorner, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

import { useBoardChrome } from "../_context/app-shell";
import { TEMPLATE_CATEGORIES, type TemplateCategoryItem } from "../templates/_lib/template-categories";

interface NavLinkItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
  danger?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const isTemplatesSection = pathname.startsWith("/templates");
  const { isMobileNavOpen, setIsMobileNavOpen } = useBoardChrome();

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname, setIsMobileNavOpen]);

  const primaryLinks: NavLinkItem[] = [
    {
      href: "/boards",
      label: "Boards",
      icon: SquareKanban,
      active: pathname.startsWith("/boards"),
    },
    {
      href: "/templates",
      label: "Templates",
      icon: FilePlusCorner,
      active: isTemplatesSection,
    },
  ];

  function renderNavLink(link: NavLinkItem) {
    const className = cn(
      "flex cursor-pointer items-center gap-3 rounded-md px-3.5 py-2 text-left text-[13.5px]",
      link.danger
        ? "font-medium text-destructive hover:bg-destructive/10"
        : link.active
          ? "bg-primary/10 font-semibold text-primary"
          : "font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
    );

    return (
      <Link key={link.label} href={link.href} className={className}>
        <link.icon className="size-4.5 shrink-0" />
        <span>{link.label}</span>
      </Link>
    );
  }

  function renderTemplateCategory(category: TemplateCategoryItem) {
    const href = `/templates/${category.slug}`;
    const active = pathname === href;
    return (
      <Link
        key={category.slug}
        href={href}
        className={cn(
          "rounded-md py-2 pr-3.5 pl-11 text-left text-[13.5px]",
          active
            ? "bg-accent font-medium text-foreground"
            : "font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        {category.label}
      </Link>
    );
  }

  return (
    <>
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-none flex-col overflow-hidden bg-background pt-4 transition-transform duration-200",
          "md:static md:z-auto md:translate-x-0 md:bg-transparent",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-end px-4 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
          >
            <X className="size-4.5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 pt-2 pb-1 md:pt-6">
          {primaryLinks.map(renderNavLink)}
          {isTemplatesSection && (
            <div className="mt-1 flex flex-col gap-0.5">
              <Link
                href="/templates/mine"
                className={cn(
                  "rounded-md py-2 pr-3.5 pl-11 text-left text-[13.5px]",
                  pathname === "/templates/mine"
                    ? "bg-accent font-medium text-foreground"
                    : "font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                My templates
              </Link>
              {TEMPLATE_CATEGORIES.map(renderTemplateCategory)}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
