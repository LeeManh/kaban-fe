import Link from "next/link";

import { cn } from "@/lib/utils";

import { TemplateSearchInput } from "./template-search-input";
import { TEMPLATE_CATEGORIES } from "../_lib/template-categories";

export function FeaturedCategories() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[17px] font-bold text-foreground">Featured categories</h1>
        <TemplateSearchInput className="relative w-full shrink-0 sm:w-80" />
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-7">
        {TEMPLATE_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/templates/${category.slug}`}
            className="flex flex-col items-center gap-3"
          >
            <span
              className={cn(
                "flex w-full aspect-square items-center justify-center rounded-sm text-white",
                category.tileClassName,
              )}
            >
              <category.icon className="size-6 lg:size-8" />
            </span>
            <span className="text-center text-[12.5px] font-medium text-foreground">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
