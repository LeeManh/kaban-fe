"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { FeaturedCategories } from "./featured-categories";
import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";
import { TemplatesEmptyState } from "./templates-empty-state";
import { useTemplates } from "../_hooks/use-templates";
import { TEMPLATE_CATEGORIES } from "../_lib/template-categories";

export function TemplatesPageContent() {
  const { data, isLoading, isError } = useTemplates();
  const templates = data?.items ?? [];

  const groups = TEMPLATE_CATEGORIES.map((category) => ({
    category,
    items: templates.filter((template) => template.templateCategory === category.value),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
          <FeaturedCategories />

          <h2 className="mb-6 text-[17px] font-bold text-foreground">All templates</h2>

          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <TemplateCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <p className="text-[13.5px] text-muted-foreground">
              Couldn&apos;t load templates. Please try again.
            </p>
          ) : groups.length === 0 ? (
            <TemplatesEmptyState message="No templates found." />
          ) : (
            <div className="flex flex-col gap-8">
              {groups.map(({ category, items }) => (
                <div key={category.slug}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-[16px] font-bold text-foreground">{category.label}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/templates/${category.slug}`} />}
                    >
                      More templates for {category.label}
                    </Button>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {items.map((template) => (
                      <TemplateCard
                        key={template.id}
                        id={template.id}
                        categorySlug={category.slug}
                        name={template.name}
                        background={template.background}
                        description={template.templateDescription}
                        owner={template.owner}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
